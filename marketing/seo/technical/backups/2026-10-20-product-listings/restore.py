"""Print Admin GraphQL mutations that restore the 2026-10-20 product listing backup.

Usage:
  python3 restore.py product <handle>
  python3 restore.py collection <handle>
  python3 restore.py all
"""

import json
import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent

PRODUCT_UPDATE = (
    "mutation($product: ProductUpdateInput!) { productUpdate(product: $product) "
    "{ product { id } userErrors { field message } } }"
)
FILE_UPDATE = (
    "mutation($files: [FileUpdateInput!]!) { fileUpdate(files: $files) "
    "{ files { id alt } userErrors { field message } } }"
)
COLLECTION_UPDATE = (
    "mutation($input: CollectionInput!) { collectionUpdate(input: $input) "
    "{ collection { id } userErrors { field message } } }"
)


def product_ops(data):
    product = {
        "id": data["id"],
        "title": data["title"],
        "descriptionHtml": data["descriptionHtml"],
        "productType": data["productType"] or "",
        "tags": data["tags"],
        "seo": {
            "title": data["seo"]["title"] or "",
            "description": data["seo"]["description"] or "",
        },
    }
    if data.get("category"):
        product["category"] = data["category"]["id"]
    ops = [{"query": PRODUCT_UPDATE, "variables": {"product": product}}]
    files = [{"id": m["id"], "alt": m["alt"] or ""} for m in data["media_alt"]]
    if files:
        ops.append({"query": FILE_UPDATE, "variables": {"files": files}})
    return ops


def collection_ops(data):
    collection = {
        "id": data["id"],
        "title": data["title"],
        "descriptionHtml": data["descriptionHtml"],
        "seo": {
            "title": data["seo"]["title"] or "",
            "description": data["seo"]["description"] or "",
        },
    }
    if data.get("image"):
        collection["image"] = {"id": data["image"]["id"], "altText": data["image"]["altText"] or ""}
    return [{"query": COLLECTION_UPDATE, "variables": {"input": collection}}]


def load(kind, handle):
    return json.loads((HERE / f"{kind}s" / f"{handle}.json").read_text())


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 1
    ops = []
    if argv[1] == "product":
        ops = product_ops(load("product", argv[2]))
    elif argv[1] == "collection":
        ops = collection_ops(load("collection", argv[2]))
    elif argv[1] == "all":
        for path in sorted((HERE / "products").glob("*.json")):
            ops += product_ops(json.loads(path.read_text()))
        for path in sorted((HERE / "collections").glob("*.json")):
            ops += collection_ops(json.loads(path.read_text()))
    for op in ops:
        print(json.dumps(op, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
