import { useForm, Controller } from "react-hook-form"
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import Select from 'react-select';
import { FaArrowRotateRight, FaCirclePlus } from "react-icons/fa6";
import axiosInstance from "../../../axiosConfig";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import blankImage from '../../assets/images/movieImg.png';
import { categoryOptions, genreOptions, languageOptions } from "../../utils/utils";


const AddandEditMovieForm = ({ editData, mutate }) => {
    const movie = editData || null
    const [imagePreview, setImagePreview] = useState(null);
    const [isBtnDisable, setIsBtnDisable] = useState(false)
    const { register, handleSubmit, reset, control, setValue, setError, formState: { errors } } = useForm()

    useEffect(() => {
        if (movie) {
            setValue('_id', movie._id)
            setValue('name', movie.name)
            setValue('releaseDate', movie.releaseDate)
            setValue('category', movie.category)
            setValue('actor', movie.actor)
            setValue('genre', movie.genre)
            setValue('duration', movie.duration)
            setValue('rating', movie.rating)
            setValue('language', movie.language)
            setValue('description', movie.description)
        }
    }, [movie])
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreview(reader.result);
            };

            // Read the file as a data URL
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };
    const handleStoreMovie = (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append("file", data.image[0]);
        formData.append("newData", JSON.stringify(data));


        axiosInstance.post('/movie', formData)
            .then(res => {
                console.log(res.data);
                if (res.data.code === 204) {
                    const validation = res.data.validationErrors
                    validation.map(element => {
                        setError(element.field, {
                            type: 'manual',
                            message: element.message,
                        })
                    })
                    setIsBtnDisable(false)
                }
                if (res.status == 200) {
                    setIsBtnDisable(false)
                    mutate()
                    toast.success(res.data.message)
                    setImagePreview(null)
                    reset()
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleUpdate = (data) => {
        const formData = new FormData();
        formData.append("file", data.image[0]);
        formData.append("newData", JSON.stringify(data));

        axiosInstance.patch('/movie', formData)
            .then(res => {
                console.log(res.data);
                if (res.data.code === 204) {
                    const validation = res.data.validationErrors
                    validation.map(element => {
                        setError(element.field, {
                            type: 'manual',
                            message: element.message,
                        })
                    })
                }
                if (res.status == 200) {
                    toast.success(res.data.message)
                    mutate()
                    reset()
                    document.getElementById(data._id).close()
                }
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <>
            <form onSubmit={handleSubmit(movie ? handleUpdate : handleStoreMovie)} className="p-4 md:p-6">
                {movie && <input type="hidden" {...register('_id')} />}
                <div className="flex flex-col md:flex-row gap-4">

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text"  {...register('name', { required: "The field is required." })} placeholder="Movie Name" className="input input-bordered w-full " />
                        {errors?.name && <p className="text-red-400">{errors.name.message}</p>}
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Release Date</span>
                        </label>
                        <Controller
                            control={control}
                            name="releaseDate"
                            rules={{ required: 'This field is required' }}

                            render={({ field }) => (
                                <Flatpickr
                                    {...field}
                                    options={{ dateFormat: 'd-M-Y', static: true }}
                                    onChange={(selectedDates, dateStr, ins) => {
                                        setValue('releaseDate', selectedDates[0]),
                                            console.log(selectedDates);
                                    }}
                                    className="input input-bordered w-full "
                                    placeholder="Release Date"
                                />
                            )}
                        />

                        {errors?.releaseDate && <p className="text-red-400">{errors.releaseDate.message}</p>}
                    </div>

                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select className="select select-primary w-full " {...register('category', { required: "The field is required" })} >
                            {categoryOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}

                        </select>
                        {errors?.category && <p className="text-red-400">{errors.category.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Movie Duration</span>
                        </label>
                        <input type="number" {...register('duration', {
                            required: "The field is required", validate: value => parseFloat(value) > 0 && parseInt(value) === parseFloat(value)?true: "Please enter Valid Duration(e.g:120 min)." ,
                        })} placeholder="Movie Duration" className="input input-bordered w-full " />
                        {errors?.duration && <p className="text-red-400">{errors.duration.message}</p>}
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Actor</span>
                        </label>
                        <input type="text" {...register('actor', { required: "The field is required" })} placeholder="Movie Actors" className="input input-bordered input-primary  w-full " />
                        {errors?.actor && <p className="text-red-400">{errors.actor.message}</p>}
                    </div>


                </div>
                <div className="flex flex-col md:flex-row gap-4 z-10">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Genre</span>
                        </label>
                        
                        <Controller
                            name="genre"
                            control={control}
                            defaultValue={''}
                            rules={{ required: "The field is required" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    closeMenuOnSelect={false}
                                    options={genreOptions}
                                    isMulti
                                />
                            )}
                        />
                        {errors?.genre && <p className="text-red-400">{errors.genre.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Language</span>
                        </label>
                        <Controller
                            name="language"
                            control={control}
                            defaultValue={''}
                            rules={{ required: "The field is required" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    closeMenuOnSelect={false}
                                    options={languageOptions}
                                    isMulti
                                />
                            )}
                        />
                        {errors?.language && <p className="text-red-400">{errors.language.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <input type="number" {...register('rating', { required: "The field is required", validate: value => parseFloat(value) > 0 && parseFloat(value) < 11 ? true : "Please enter Valid Rating." })} placeholder="Rating" className="input input-bordered input-primary  w-full " />
                        {errors?.rating && <p className="text-red-400">{errors.rating.message}</p>}
                    </div>
                   

                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Movie Image</span>
                        </label>
                        {
                            editData ? <>
                                <img src={imagePreview ? imagePreview : editData?.image?.url} className="w-28 h-28 bg-white outline outline-1 outline-indigo-500 rounded-md mb-2" />
                                <input type="file" {...register('image')} onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full " />
                            </> : <><img src={imagePreview ? imagePreview : blankImage} className="w-28 h-28 bg-white outline outline-1 outline-indigo-500 rounded-md mb-2" />
                                <input type="file" {...register('image')} onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full " /></>
                        }
                        {errors?.image && <p className="text-red-400">{errors.image.message}</p>}

                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea {...register('description', { required: "The field is required" })} className="textarea textarea-primary h-full" placeholder="Bio"></textarea>
                        {errors?.description && <p className="text-red-400">{errors.description.message}</p>}
                    </div>
                </div>
                <div className="flex gap-3 mt-2">
                    <button type="submit" className="btn px-8  btn-primary " disabled={isBtnDisable}>{movie ? <FaArrowRotateRight /> : <FaCirclePlus />}{editData ? 'Úpdate' : 'Add'}</button>
                    {

                        isBtnDisable && <span className="loading loading-spinner text-primary loading-lg"></span>
                    }
                </div>

            </form>


        </>
    );
};

export default AddandEditMovieForm;