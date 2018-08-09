from .models import User,Peopledata,Handsdata
from django.shortcuts import render
import json
from scipy.io import loadmat
import scipy.io as sio
import random
def index(request):
    return render(request, 'EIA/login.html', context={})

def people(request):
    people = Peopledata.objects.get(id=random.randint(0, Peopledata.objects.count()))
    data = json.loads(people.datajson)
    count = 0
    imgurl = "/static/EIA/people-images/" + people.dataname +".jpg"
    for item in data:
        count = count + 1
    return render(request, 'EIA/Marking.html', context={'json': people.datajson, 'num': count,'name': people.dataname,'imgurl':imgurl})

def hand(request):
    hand = Handsdata.objects.order_by('?')[:1]
    try:
        m = loadmat("U:\\hand\\joints\\video_1\\" + hand[0].dataname + ".mat")
        b = loadmat("U:\\hand\\bound\\video_1\\" + hand[0].dataname + ".mat")
    except:
        print("call except")
        sio.savemat("U:\\hand\\joints\\video_1\\" + hand[0].dataname + ".mat", {'joints_2d': [[]]})
        sio.savemat("U:\\hand\\bound\\video_1\\" + hand[0].dataname + ".mat", {'bound': [0, 0, 100, 100]})
        m = loadmat("U:\\hand\\joints\\video_1\\" + hand[0].dataname + ".mat")
        b = loadmat("U:\\hand\\bound\\video_1\\" + hand[0].dataname + ".mat")
    newjson = {}
    array = []
    for item in m["joints_2d"]:
        array.append(item[0])
        array.append(item[1])
        array.append(1)
    newjson["keypoint_annotations"] = {}
    newjson["keypoint_annotations"]["hand1"] = array
    print(array)
    array2 = []
    for item in b["bound"]:
        array2.append(float(item[0]))
        array2.append(float(item[1]))
        array2.append(float(item[2]))
        array2.append(float(item[3]))
    newjson["bound"] = array2
    return render(request, 'EIA/Markinghand.html',
                  context={'json': json.dumps(newjson), 'num': 1, 'name': hand[0].dataname})

def updatepeople(request):
    print("get")
    if request.POST:
        print(request.POST)
        data = json.loads(request.POST.get("data"))
        down = Peopledata.objects.get(dataname=data[0]["dataname"])
        downjson = json.loads(down.datajson)
        print(downjson)
        i = 0
        for item in downjson:
            print(item)
            item = data[i+1]["values"]
            i = i + 1
        down.datajson = json.dumps(downjson)
        print(downjson)
        down.save()
    return index(request)
def updatehand(request):
    if request.POST:
        print(request.POST)
        data = json.loads(request.POST.get("data"))
        print(data)
        dataname = data[0]['dataname']
        m = loadmat("U:\\hand\\joints\\video_1\\" + dataname + ".mat")
        b = loadmat("U:\\hand\\bound\\video_1\\" + dataname + ".mat")
        print(data[1]['values'])
        i=0;j = 0
        print(len(data[1]['values']))
        joints = []
        while(j<len(data[1]['values'])):
            array = []
            array.append(data[1]['values'][j])
            array.append(data[1]['values'][j+1])
            array.append(data[1]['values'][j+2])
            joints.append(array)
            j=j+3
        m['joints_2d'] = joints;
        b['bound'] = data[2]['values']
        sio.savemat("U:\\hand\\joints\\video_1\\" + dataname + ".mat", m)
        sio.savemat("U:\\hand\\bound\\video_1\\" + dataname + ".mat", b)
        print(m)
    return index(request)