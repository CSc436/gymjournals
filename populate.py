from imports import *

jesse = SiteUser(email="jbright@email.com", username="jbright", pwd="lol")
jesse.gender = 'M'
jesse.dob = date(year=1992, month=3, day=10)
jesse.save()

jw = Weight(
    user=jesse,
    weight=150,
    date=date(year=2014, month=3, day=29)
    )
jw.save()

dan = SiteUser(email="dbelcher@email.com", username="dbelcher", pwd="haha")
dan.gender = 'M'
dan.dob = date(year=1993, month=6, day=14)
dan.save()

dw = Weight(
    user=dan,
    weight=155,
    date=date(year=2014, month=3, day=29)
    )
dw.save()

logan = SiteUser(
    email="lchadderdon@email.com",
    username="lchadderdon",
    pwd="password",
    gender='M',
    dob=date(year=1992, month=4, day=8)
    )
logan.save()

storme = SiteUser(email="stormeb@email.com", username="stormeb", pwd="yolo")
storme.gender = 'M'
storme.dob = date(year=1992, month=3, day=5)
storme.save()

haziel = SiteUser(email="hzuniga@email.com", username="hzuniga", pwd="haziel")
haziel.dob = date(year=1992, month=1, day=1)
haziel.gender = 'M'
haziel.save()

zach = SiteUser(email="zach@email.com", username="zach", pwd="zach")
zach.gender = 'M'
zach.dob = date(year=1993, month=5, day=7)
zach.save()

carlton = SiteUser(
    email="carlton@gmail.com",
    username="carlton",
    pwd="carlton",
    gender='M',
    dob=date(year=1993, month=2, day=4)
    )
carlton.save()

ryan = SiteUser(email="ryan@gmail.com", username="ryan", pwd="ryan")
ryan.gender = 'M'
ryan.dob = date(year=1991, month=5, day=3)
ryan.save()

jesse_workout = Workout(user=jesse, date=date(year=2014, month=3, day=7))

jesse_workout.save()

dan_workout = Workout(user=dan, date=date(year=2013, month=3, day=7))
dan_workout.save()

dan_workout_two = Workout(user=dan, date=date(year=2015, month=6, day=10))
dan_workout_two.save()

dan_wex = WeightExercise(
    name="Bench Press",
    duration=time(minute=15)
    )
dan_wex.wkout = dan_workout
dan_wex.save()

Tag(
    user=dan,
    weight_exercise=dan_wex,
    tag="Chest"
    ).save()

dan_ex = Set(
    ex=dan_wex,
    weight=105,
    num=1,
    reps=5
    )
dan_ex.save()

dan_ex = Set(
    ex=dan_wex,
    weight=105,
    num=2,
    reps=5
    )
dan_ex.save()

dan_ex = Set(
    ex=dan_wex,
    weight=105,
    num=3,
    reps=5
    )
dan_ex.save()

dan_ex = Set(
    ex=dan_wex,
    weight=105,
    num=4,
    reps=5
    )
dan_ex.save()

dan_ex = Set(
    ex=dan_wex,
    weight=105,
    num=5,
    reps=5
    )
dan_ex.save()

dan_wex = WeightExercise(
    name="Shoulder Press",
    duration=time(minute=10)
    )
dan_wex.wkout = dan_workout
dan_wex.save()

Tag(
    user=dan,
    weight_exercise=dan_wex,
    tag="Chest"
    ).save()

Tag(
    user=dan,
    weight_exercise=dan_wex,
    tag="Shoulders"
    ).save()

dan_ex = Set(
    ex=dan_wex,
    weight=85,
    reps=5,
    num=1
    )
dan_ex.save()

dan_ex = Set(
    ex=dan_wex,
    weight=85,
    reps=5,
    num=2
    )
dan_ex.save()

dan_ex = Set(
    ex=dan_wex,
    weight=85,
    reps=5,
    num=3
    )
dan_ex.save()

dan_wex = WeightExercise(
    name="Tricep Extension",
    duration=time(minute=10)
    )
dan_wex.wkout = dan_workout
dan_wex.save()

Tag(
    user=dan,
    weight_exercise=dan_wex,
    tag="Triceps"
    ).save()

dan_ex = Set(
    ex=dan_wex,
    weight=45,
    reps=8,
    num=1
    )
dan_ex.save()

Set(
    ex=dan_wex,
    weight=45,
    reps=8,
    num=2
    ).save()

Set(
    ex=dan_wex,
    weight=45,
    reps=8,
    num=3
    ).save()

dan_wex = WeightExercise(
    name="Pec Fly",
    duration=time(minute=10)
    )
dan_wex.wkout = dan_workout
dan_wex.save()

Tag(
    user=dan,
    weight_exercise=dan_wex,
    tag="Chest"
    ).save()

Set(
    ex=dan_wex,
    weight=110,
    reps=5,
    num=1
    ).save()

Set(
    ex=dan_wex,
    weight=110,
    reps=5,
    num=2
    ).save()

Set(
    ex=dan_wex,
    weight=110,
    reps=5,
    num=3
    ).save()

dan_wex = WeightExercise(
    name="Tricep Pulldowns",
    duration=time(minute=10)
    )
dan_wex.wkout = dan_workout
dan_wex.save()

Tag(
    user=dan,
    weight_exercise=dan_wex,
    tag="Triceps"
    ).save()

Set(
    ex=dan_wex,
    weight=95,
    num=1
    ).save()

Set(
    ex=dan_wex,
    weight=60,
    num=2
    ).save()

Set(
    ex=dan_wex,
    weight=25,
    num=3
    ).save()

j_ex = AerobicExercise(
    name="Swimming",
    duration=time(minute=35),
    avg_heartrate=115
    )
j_ex.wkout = jesse_workout
j_ex.save()

Tag(
    user=jesse,
    aerobic_exercise=j_ex,
    tag="Swimming"
    ).save()

dan_ex = AerobicExercise(
    name="Running",
    duration=time(minute=30),
    avg_heartrate=120
    )
dan_ex.wkout = dan_workout
dan_ex.save()

Tag(
    user=dan,
    aerobic_exercise=dan_ex,
    tag="Running"
    ).save()
