import json
f = open("U:\peopleimg\examples.json", encoding='utf-8')
data = json.load(f)
for item in data:
    print(item)
    print(item['image_id'])
    print(json.dumps(item['keypoint_annotations']))