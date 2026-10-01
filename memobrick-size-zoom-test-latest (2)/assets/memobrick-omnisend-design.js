/* =====================================================================
   MemoBrick — send the customer's design to Omnisend
   When a design is added to the cart, send Omnisend a custom event
   ("added design to cart") that carries the picture of the customer's
   own mosaic. An Omnisend workflow triggered by this event can then
   show THEIR design in the reminder email instead of the plain product
   photo.

   Stand-alone: it only listens for the editor's "memobrick:added" event
   and never changes the cart. If Omnisend isn't on the page, or the
   contact isn't known yet, it does nothing.

   Configured from Theme settings → "Omnisend design reminder"
   (window.MB_OMNISEND_DESIGN).
===================================================================== */
(() => {
  "use strict";
  const CFG = window.MB_OMNISEND_DESIGN || {};
  if (!CFG.enabled) return;
  const EVENT = CFG.eventName || "added design to cart";

  function knownEmail(){
    if (CFG.customerEmail) return CFG.customerEmail;
    try { return localStorage.getItem("mb_email") || ""; } catch (e){ return ""; }
  }
  function abs(u){
    if (!u) return "";
    if (u.indexOf("//") === 0) return "https:" + u;
    if (u.charAt(0) === "/") return (CFG.origin || location.origin) + u;
    return u;
  }
  function designUrlFrom(line){
    const p = (line && line.properties) || {};
    const v = p["Final Design"];
    return (typeof v === "string" && /^(https?:)?\/\//.test(v)) ? abs(v) : "";
  }
  function sizeFrom(line){
    const p = (line && line.properties) || {};
    return p["MemoBrick Size"] || p["Selected size"] || "";
  }
  function uid(){
    try { return crypto.randomUUID(); } catch (e){}
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16);
    });
  }

  document.addEventListener("memobrick:added", (e) => {
    try {
      if (!window.omnisend || typeof window.omnisend.push !== "function") return;
      const d = (e && e.detail) || {}, line = d.line || {};
      const design = designUrlFrom(line);
      const productImage = abs(line.image || (line.featured_image && line.featured_image.url) || "");
      const imageURL = design || productImage;
      if (!imageURL) return;

      const price = Number(line.final_price != null ? line.final_price : line.price) / 100 || 0;
      const cartURL = (CFG.origin || location.origin) + (CFG.root || "/") + "cart";
      const item = {
        designImageURL: imageURL,
        hasCustomDesign: !!design,
        designID: d.designId || "",
        productTitle: line.product_title || line.title || "MemoBrick mosaic",
        size: sizeFrom(line),
        productPrice: price,
        productQuantity: line.quantity || 1,
        productURL: abs(line.url || ""),
        productImageURL: productImage,
        productVariantID: String(line.variant_id || "")
      };
      const payload = {
        origin: "api",
        eventID: uid(),
        eventTime: new Date().toISOString(),
        properties: {
          designImageURL: imageURL,          // single picture, for simple image blocks
          designID: item.designID,
          productTitle: item.productTitle,
          size: item.size,
          value: price,
          currency: CFG.currency || "USD",
          cartURL: cartURL,
          lineItems: [item]                  // list, for Omnisend dynamic content layouts
        }
      };
      // Also save the design on the contact profile, so ANY Omnisend email
      // (Abandoned Cart, Abandoned Checkout, ...) can show it with
      // [[contact.custom_properties.last_design_image]]
      const contact = {
        customProperties: {
          last_design_image: design || "",       // only a real customer design, never the product photo
          last_design_size: item.size,
          last_design_id: item.designID,
          last_design_at: new Date().toISOString()
        }
      };
      const email = knownEmail();
      if (email) contact.email = email;
      // Omnisend needs an email (or id/phone) inside "contact"; without one we
      // leave it out and Omnisend uses the visitor it already recognises.
      if (email) payload.contact = design ? contact : { email: email };
      window.omnisend.push(["track", EVENT, payload]);
    } catch (err){ /* never affect the cart */ }
  });
})();
