import article from "./documents/article";
import category from "./documents/category";
import author from "./documents/author";

import portableText from "./objects/portableText";
import table from "./objects/table";
import checklist from "./objects/checklist";
import callout from "./objects/callout";
import faq from "./objects/faq";
import keyTakeaways from "./objects/keyTakeaways";
import prosCons from "./objects/prosCons";
import metricHighlights from "./objects/metricHighlights";
import relatedArticles from "./objects/relatedArticles";
import divider from "./objects/divider";

export const schemaTypes = [
  // Documents
  article,
  category,
  author,

  // Portable Text
  portableText,

  // Content objects
  table,
  checklist,
  callout,
  faq,
  keyTakeaways,
  prosCons,
  metricHighlights,
  relatedArticles,
  divider,
];