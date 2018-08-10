from .models import User,Peopledata,Handsdata
from django.shortcuts import render
import json
from scipy.io import loadmat
import scipy.io as sio
import random
handjointspath = "U:\\hand\\joints\\video_1\\"
handboundspath = "U:\\hand\\bound\\video_1\\"
def index(request):
    return render(request, 'EIA/login.html', context={})

def people(request):
    while(1):
        people = Peopledata.objects.get(id=random.randint(0, Peopledata.objects.count()-1))
        if people.token == 0 :
            break
    people.token = 1
    people.save()
    data = json.loads(people.datajson)
    count = 0
    imgurl = "/static/EIA/people-images/" + people.dataname +".jpg"
    for item in data:
        count = count + 1
    return render(request, 'EIA/Marking.html', context={'json': people.datajson, 'num': count,'name': people.dataname,'imgurl':imgurl})

def hand(request):
    while (1):
        hand = Handsdata.objects.get(id=random.randint(0, Handsdata.objects.count() - 1))
        if hand.token == 0:
            break
    hand.token = 1
    hand.save()
    try:
        m = loadmat(handjointspath + hand.dataname + ".mat")
        b = loadmat("U:\\hand\\bound\\video_1\\" + hand.dataname + ".mat")
    except:
        sio.savemat(handjointspath + hand.dataname + ".mat", {'joints_2d': [[]]})
        sio.savemat(handboundspath + hand.dataname + ".mat", {'bound': [0, 0, 100, 100]})
        m = loadmat(handjointspath + hand.dataname + ".mat")
        b = loadmat(handboundspath + hand.dataname + ".mat")
    newjson = {}
    array = []
    for item in m["joints_2d"]:
        array.append(item[0])
        array.append(item[1])
        array.append(1)
    newjson["keypoint_annotations"] = {}
    newjson["keypoint_annotations"]["hand1"] = array
    array2 = []
    for item in b["bound"]:
        array2.append(float(item[0]))
        array2.append(float(item[1]))
        array2.append(float(item[2]))
        array2.append(float(item[3]))
    newjson["bound"] = array2
    return render(request, 'EIA/Markinghand.html',
                  context={'json': json.dumps(newjson), 'num': 1, 'name': hand.dataname})
def updatepeople(request):
    if request.POST:
        data = json.loads(request.POST.get("data"))
        down = Peopledata.objects.get(dataname=data[0]["dataname"])
        downjson = json.loads(down.datajson)
        i = 0
        for item in downjson:
            print(item)
            item = data[i+1]["values"]
            i = i + 1
        down.datajson = json.dumps(downjson)
        down.token = 0
        down.save()
    return index(request)
def updatehand(request):
    if request.POST:
        data = json.loads(request.POST.get("data"))
        dataname = data[0]['dataname']
        hand = Handsdata.objects.get(dataname=dataname)
        hand.token = 0
        hand.save()
        m = loadmat(handjointspath + dataname + ".mat")
        b = loadmat(handboundspath + dataname + ".mat")
        i=0;j = 0
        joints = []
        while(j<len(data[1]['values'])):
            array = []
            array.append(data[1]['values'][j])
            array.append(data[1]['values'][j+1])
            array.append(data[1]['values'][j+2])
            joints.append(array)
            j=j+3
        m['joints_2d'] = joints
        b['bound'] = data[2]['values']
        sio.savemat(handjointspath + dataname + ".mat", m)
        sio.savemat(handboundspath + dataname + ".mat", b)
    return index(request)