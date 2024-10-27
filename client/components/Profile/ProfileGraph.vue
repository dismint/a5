<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { VueFlow, useVueFlow, MarkerType } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { fetchy } from "../../utils/fetchy";
import '@vue-flow/core/dist/style.css'

const { onInit, onNodeClick, onConnect, addEdges, setViewport, toObject, addNodes, fitView } = useVueFlow()
const emit = defineEmits(["nodeClick"]);
const props = defineProps(["updateGraph"]);
const initNodes = ref([])
const initEdges = ref([])

onInit((vueFlowInstance) => {
  vueFlowInstance.fitView()
})

onNodeClick(async ({ event, node }) => {
  const tags = await fetchy("/api/tag/view", "GET", { query: { _id: node.id } });
  emit("nodeClick", node.id);
  // setViewport({ x: 200, y: 225, zoom: 0.5 })
})

onConnect((connection) => {
  addEdges(connection)
})

watch(() => props.updateGraph, async (newVal, oldVal) => {
  populateGraph();  
})

function circlePoint(radius: number): { x: number; y: number } {
  const angle = Math.random() * 2 * Math.PI;
  const r = Math.sqrt(Math.random()) * radius;
  const x = r * Math.cos(angle);
  const y = r * Math.sin(angle);
  
  return { x, y };
}

async function populateGraph() {
  const graph = await fetchy("/api/graph/nodes");
  for (let node of graph) {
    const webapp = await fetchy("/api/webapp/view", "GET", { query: { _id: node.item } });
    addNodes({
      id: node.item,
      position: circlePoint(300),
      data: { label: webapp.name },
      class: 'light',
    });
  }
  for (let node of graph) {
    for (let edge of node.neighbors) {
      console.log(node.item, edge);
      addEdges({
        id: `${node.item}-${edge}`,
        source: node.item,
        target: edge,
        animated: true,
      });
    }
  }

  setViewport({ x: 210, y: 235, zoom: 0.5 })
}


onMounted(() => {
  populateGraph();
})
</script>

<template>
  <div class="graph">
    <VueFlow
      :nodes="initNodes"
      :edges="initEdges"
      :min-zoom="0.2"
      :max-zoom="4"
    >
      <Background pattern-color="#aaa" :gap="16" />
    </VueFlow>
  </div>
</template>

<style scoped>
.graph {
  height: 30em;
  width: 80em;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
