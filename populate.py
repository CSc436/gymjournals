from imports import *

jesse = SiteUser(email="jbright@email.com", username="jbright", pwd="lol")
jesse.save()

dan = SiteUser(email="dbelcher@email.com", username="dbelcher", pwd="haha")
dan.save()

logan = SiteUser(
    email="lchadderdon@email.com",
    username="lchadderdon",
    pwd="password"
    )
logan.save()

storme = SiteUser(email="stormeb@email.com", username="stormeb", pwd="yolo")
storme.save()

haziel = SiteUser(email="hzuniga@email.com", username="hzuniga", pwd="haziel")
haziel.save()

zach = SiteUser(email="zach@email.com", username="zach", pwd="zach")
zach.save()

carlton = SiteUser(
    email="carlton@gmail.com",
    username="carlton",
    pwd="carlton"
    )
carlton.save()

ryan = SiteUser(email="ryan@gmail.com", username="ryan", pwd="ryan")
ryan.save()

jesse_workout = Workout(user=jesse, date=date(year=2014, month=3, day=7))

jesse_workout.save()

dan_workout = Workout(user=dan, date=date(year=2013, month=3, day=7))
dan_workout.save()

dan_workout_two = Workout(user=dan, date=date(year=2015, month=6, day=10))
dan_workout_two.save()
