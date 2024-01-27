import { Controller, useForm } from "react-hook-form";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import useAllMovies from "../../hooks/useAllMovies";
import { useEffect, useState } from "react";
import CreatableSelect from 'react-select/creatable';
import { FaCircleArrowRight, FaCircleXmark } from "react-icons/fa6";
import axiosInstance from "../../../axiosConfig";
import { toast } from "react-toastify";
import useAllMovieShow from "../../hooks/useAllMovieShow";
import { useNavigate } from "react-router-dom";


const AddandEditShowFrom = ({ editData }) => {
    const movieShows = editData || null
    const timeTypePriceId = movieShows?.showTimesTypesPrice && movieShows?.showTimesTypesPrice[0]?._id || null
    console.log(timeTypePriceId);
    const { register, handleSubmit, reset, control, watch, setValue, setError, formState: { errors } } = useForm()
    const checkRegular = watch('regular')
    const premiumRegular = watch('premium')
    const [uniqueError, setUniqueError] = useState(null);
    const { movies } = useAllMovies()
    const { mutate } = useAllMovieShow()
    const navigate = useNavigate()

    // console.log(movieShows);
    const options = [
        { value: '6:00 am', label: '6:00 am' },
        { value: '10:00 am', label: '10:00 am' },
        { value: '2:00 pm', label: '2:00 pm' },
        { value: '6:00 pm', label: '6:00 pm' }
    ]
    // console.log(movieShows?.showTimesTypesPrice[0]?._id);
    useEffect(() => {
        if (movieShows) {
            setValue('showId', movieShows._id)
            setValue('date', movieShows.date)
            setValue('movie', movieShows.movie._id)

            movieShows?.showTimesTypesPrice && (
                setValue('time', movieShows?.showTimesTypesPrice[0]?.time),
                setValue('timeTypePriceId', movieShows?.showTimesTypesPrice[0]?._id),
                setValue('timeTypePriceId', movieShows?.showTimesTypesPrice[0]?._id),

                movieShows?.showTimesTypesPrice[0]?.seatTypesPrice?.map(element => {
                    setValue(element.seatType, element.seatType)

                    element.seatType == 'regular' && setValue('regularSeatPrice', element.price)
                    element.seatType == 'premium' && setValue('premiumSeatPrice', element.price)
                })
            )
        }
    }, [movieShows])

    const handleStore = (data) => {

        const regular = data.regular ? { seatType: data.regular, price: data.regularSeatPrice } : null
        const premium = data.premium ? { seatType: data.premium, price: data.premiumSeatPrice } : null
        const seatTypesPrice = []
        regular !== null && seatTypesPrice.push(regular);
        premium !== null && seatTypesPrice.push(premium);
        const showTimesTypesPrice = [{ time: data.time, seatTypesPrice: seatTypesPrice }]
        //Final Movie show schedule
        const newData = { date: data.date[0], movie: data.movie, showTimesTypesPrice: showTimesTypesPrice }
        console.log(newData);
        axiosInstance.post('/show', newData)
            .then(res => {
                if (res.data.uniqueErrorCode == 204) {
                    setUniqueError(res.data.uniqueErrorMessage)
                }
                if (res.data.code === 204) {
                    const validation = res.data.validationErrors
                    validation.map(element => {
                        setError(element.field, {
                            type: 'manual',
                            message: element.message,
                        })
                    })
                }
                if (res.data.code == 200) {
                    toast.success(res.data.message)
                    reset()
                    setUniqueError(null)
                }
            })
    }
    const handleUpdate = (data) => {
        const regular = data.regular ? { seatType: data.regular, price: data.regularSeatPrice } : null
        const premium = data.premium ? { seatType: data.premium, price: data.premiumSeatPrice } : null
        const seatTypesPrice = []
        regular !== null && seatTypesPrice.push(regular);
        premium !== null && seatTypesPrice.push(premium);
        const showTimesTypesPrice = [{ time: data.time, seatTypesPrice: seatTypesPrice }]
        const newData = { showId: data.showId, timeTypePriceId: data.timeTypePriceId, date: data.date, movie: data.movie, showTimesTypesPrice: showTimesTypesPrice }

        !data?.timeTypePriceId && delete newData['timeTypePriceId']
        console.log(newData);

        axiosInstance.patch('/show', newData)
            .then(res => {
                if (res.data.uniqueErrorCode == 204) {
                    setUniqueError(res.data.uniqueErrorMessage)
                }
                if (res.data.code === 204) {
                    const validation = res.data.validationErrors
                    validation.map(element => {
                        setError(element.field, {
                            type: 'manual',
                            message: element.message,
                        })
                    })
                }
                if (res.data.code == 200) {
                    toast.success(res.data.message)
                    mutate()
                    navigate("/dashboard/shows")
                }
            })
    }

    return (
        <>{uniqueError && <div onClick={() => setUniqueError(null)} role="alert" className="alert alert-error mt-2">
            <FaCircleXmark />  <span>{uniqueError}</span>
        </div>}
            <form onSubmit={handleSubmit(movieShows ? handleUpdate : handleStore)}>
                {
                    movieShows && <input type="hidden" {...register('showId')} />
                }
                {
                    timeTypePriceId && <input type="hidden" {...register('timeTypePriceId')} />
                }
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <Controller
                            control={control}
                            name="date"
                            rules={{ required: 'This field is required' }}

                            render={({ field }) => (
                                <Flatpickr
                                    {...field}
                                    options={{ dateFormat: 'd-M-Y', static: true }}
                                    // onChange={(selectedDates, dateStr, ins) => {
                                    //     setValue('date', selectedDates)
                                    // }}
                                    className="input input-bordered w-full "
                                    disabled={movieShows? true : false}
                                    placeholder="Date"
                                />
                            )}
                        />

                        {errors?.date && <p className="text-red-400">{errors.date.message}</p>}
                    </div>
                    <div className="form-control w-full  ">
                        <label className="label">
                            <span className="label-text">Movie</span>
                        </label>
                        <select className="select select-primary w-full " {...register('movie', { required: "The field is required" })} >
                            <option value="">--Select Movie--</option>
                            {movies?.map(movie => (
                                <option key={movie._id} value={movie._id}>
                                    {movie.name}
                                </option>
                            ))}

                        </select>
                        {errors?.movie && <p className="text-red-400">{errors.movie.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Show Time</span>
                        </label>
                        <Controller
                            name="time"
                            control={control}
                            defaultValue={{}}
                            rules={{
                                required: 'Time is required',
                                validate: (data) => {
                                    const regex = /^(1[0-2]|0?[1-9]):[0-5][0-9] (am|pm)$/i;
                                    if (!regex.test(data.value)) {
                                        return 'Invalid time format (e.g., 10:00 am)';
                                    }
                                    return true;
                                },
                            }}
                            render={({ field }) => (
                                <CreatableSelect {...field} isClearable options={options} />
                            )}
                        />

                        {errors?.time && <p className="text-red-400">{errors.time.message}</p>}
                    </div>
                </div>
                <div className=" ">
                    <label className="label">
                        <span className="label-text">Seat Type and Price</span>
                    </label>
                    <div className="flex gap-10 mb-3">

                        <div className="form-control ">
                            <label className="cursor-pointer label w-52  ">
                                <span className="label-text flex-shrink">Regular</span>

                                <input type="checkbox" {...register('regular')} value={"regular"} className="checkbox checkbox-secondary" />
                            </label>
                        </div>
                        {checkRegular && <input type="text" {...register('regularSeatPrice')} placeholder="Price" className="input input-bordered input-primary w-full max-w-xs" />}
                    </div>
                    <div className="flex gap-10">

                        <div className="form-control ">
                            <label className="cursor-pointer label w-52 ">
                                <span className="label-text flex-shrink">Premium</span>

                                <input type="checkbox" {...register('premium')} value={'premium'} className="checkbox checkbox-secondary" />
                            </label>
                        </div>
                        {premiumRegular && <input type="text" {...register('premiumSeatPrice')} placeholder="Price" className="input input-bordered input-primary w-full max-w-xs" />}
                    </div>

                </div>



                <button type="submit" className="btn btn-sm px-5 btn-primary rounded-full mt-3"><FaCircleArrowRight /> {movieShows ? 'update' : 'submit'}</button>
            </form>
        </>
    );
};

export default AddandEditShowFrom;