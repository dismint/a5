import AuthenticatingConcept from "./concepts/authenticating";
import FriendingConcept from "./concepts/friending";
import PostingConcept from "./concepts/posting";
import SessioningConcept from "./concepts/sessioning";
import TaggingConcept from "./concepts/tagging";
import WebappingConcept from "./concepts/webapping";
import GraphingConcept from "./concepts/graphing";

// The app is a composition of concepts instantiated here
// and synchronized together in `routes.ts`.
export const Sessioning = new SessioningConcept();
export const Authing = new AuthenticatingConcept("users");
export const Posting = new PostingConcept("posts");
export const Friending = new FriendingConcept("friends");
export const Tagging = new TaggingConcept("tags");
export const Webapping = new WebappingConcept("webapps");
export const Graphing = new GraphingConcept("graphs");
