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

dan_ex = WeightExercise(
    name="Bench Press",
    min_weight=105,
    num_sets=5,
    num_reps=5,
    duration=time(minute=15)
    )
dan_ex.wkout = dan_workout
dan_ex.save()

dan_ex = WeightExercise(
    name="Shoulder Press",
    min_weight=85,
    num_sets=3,
    num_reps=5,
    duration=time(minute=10)
    )
dan_ex.wkout = dan_workout
dan_ex.save()

dan_ex = WeightExercise(
    name="Tricep Extension",
    min_weight=45,
    num_sets=3,
    num_reps=8,
    duration=time(minute=10)
    )
dan_ex.wkout = dan_workout
dan_ex.save()

dan_ex = WeightExercise(
    name="Pec Fly",
    min_weight=110,
    num_sets=3,
    num_reps=5,
    duration=time(minute=10)
    )
dan_ex.wkout = dan_workout
dan_ex.save()

dan_ex = WeightExercise(
    name="Tricep Pulldowns",
    min_weight=25,
    max_weight=95,
    duration=time(minute=10)
    )
dan_ex.wkout = dan_workout
dan_ex.save()

j_ex = AerobicExercise(
    name="Swimming",
    duration=time(minute=35),
    initial_heartrate=65,
    final_heartrate=115
    )
j_ex.wkout = jesse_workout
j_ex.save()

dan_ex = AerobicExercise(
    name="Running",
    duration=time(minute=30),
    initial_heartrate=70,
    final_heartrate=120
    )
dan_ex.wkout = dan_workout
dan_ex.save()
