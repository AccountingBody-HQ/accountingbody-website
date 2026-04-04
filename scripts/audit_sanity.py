import requests, os

PROJECT_ID = "4rllejq1"
DATASET = "production"
TOKEN = os.environ["SANITY_API_TOKEN"]
QUERY_URL = f"https://{PROJECT_ID}.api.sanity.io/v2026-03-16/data/query/{DATASET}"
HEADERS = {"Authorization":f"Bearer {TOKEN}","Content-Type":"application/json"}

checks = [
    ("Total wp-post articles", 'count(*[_id match "wp-post-*"])'),
    ("Articles with empty body", 'count(*[_id match "wp-post-*" && (!defined(body) || length(body) == 0)])'),
    ("Wrong canonicalOwner", 'count(*[_id match "wp-post-*" && canonicalOwner != "accountingbody"])'),
    ("Missing showOnSites", 'count(*[_id match "wp-post-*" && !("accountingbody" in showOnSites)])'),
    ("With tableBlock", 'count(*[_id match "wp-post-*" && count(body[_type == "tableBlock"]) > 0])'),
    ("With excerpt", 'count(*[_id match "wp-post-*" && defined(excerpt) && excerpt != ""])'),
    ("With mcqUrl", 'count(*[_id match "wp-post-*" && defined(mcqUrl)])'),
    ("With seoTitle", 'count(*[_id match "wp-post-*" && defined(seoTitle)])'),
    ("Total practicePost documents", 'count(*[_type == "practicePost"])'),
]

print("=========================================")
print("SANITY AUDIT REPORT")
print("=========================================")
print("")

for label, query in checks:
    resp = requests.get(QUERY_URL, params={"query": query}, headers=HEADERS, timeout=30)
    result = resp.json().get("result", "ERROR")
    print(f"{label}: {result}")

print("")
print("=========================================")
print("Expected after full migration:")
print("  Total wp-post articles: ~2015")
print("  Articles with empty body: 0")
print("  Wrong canonicalOwner: 0")
print("  Missing showOnSites: 0")
print("  With tableBlock: ~472")
print("  With excerpt: ~2013")
print("  With mcqUrl: 181")
print("  Total practicePost documents: 181")
print("=========================================")