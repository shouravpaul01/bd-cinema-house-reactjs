import { useForm, Controller } from "react-hook-form"
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { FaCircleArrowRight } from "react-icons/fa6";
import { MultiSelect } from "react-multi-select-component";
import { useState } from "react";
import axiosInstance from "../../../axiosConfig";


const AddandEditFrom = () => {
    const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm()

    const categoryOptions = [
        { value: '', text: '--Select Movie Category--' },
        { value: '2D', text: '2D' },
        { value: '3D', text: '3D' },

    ];
    console.log(errors);
    const handleAddForm = (data) => {
        console.log(data.movieImage[0]);
        const formData = new FormData();
        formData.append("movieImage", data.movieImage[0]);
        formData.append("newData", JSON.stringify(data));
        console.log(data);

        axiosInstance.post('/movie', formData)
            .then(res => {
                console.log(res.data);
                if (res.data.code === 204) {
                    console.log(res.data.code);
                    const validation = res.data.validationErrors
                    validation.map(element => {
                        setError(element.field, {
                            type: 'manual',
                            message: element.message,
                        })
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <form onSubmit={handleSubmit(handleAddForm)}>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register('name',{required:"The field is required."})} placeholder="Movie Name" className="input input-bordered w-full " />
                    {errors?.name && <p className="text-red-400">{errors.name.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Movie Duration</span>
                    </label>
                    <input type="file" {...register('movieImage', { required: "The field is required." })} className="file-input file-input-bordered file-input-primary w-full " />
                    {errors?.movieImage && <p className="text-red-400">{errors.movieImage.message}</p>}

                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Release Date</span>
                    </label>
                    <Flatpickr {...register('releaseDate',{required:"The field is required."})} className="input input-bordered w-full" placeholder="Release Date" options={{ dateFormat: 'd-M-Y' }} onChange={(day, date, instance) => setValue('releaseDate', date)} />
                    
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
                                {option.text}
                            </option>
                        ))}

                    </select>
                    {errors?.category && <p className="text-red-400">{errors.category.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Movie Duration</span>
                    </label>
                    <input type="number" {...register('duration', { required: "The field is required" })} placeholder="Movie Duration" className="input input-bordered w-full " />
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
                    <input type="text" {...register('genre', { required: "The field is required" })} placeholder="Movie Genres" className="input input-bordered input-primary  w-full " />
                    {errors?.genre && <p className="text-red-400">{errors.genre.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Rating</span>
                    </label>
                    <input type="number" {...register('rating', { required: "The field is required" })} placeholder="Rating" className="input input-bordered input-primary  w-full " />
                    {errors?.rating && <p className="text-red-400">{errors.rating.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Language</span>
                    </label>
                    <input type="text" {...register('language', { required: "The field is required" })} placeholder="language" className="input input-bordered input-primary  w-full " />
                    {errors?.language && <p className="text-red-400">{errors.language.message}</p>}
                </div>

            </div>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <textarea {...register('description', { required: "The field is required" })} className="textarea textarea-primary" placeholder="Bio"></textarea>
                {errors?.description && <p className="text-red-400">{errors.description.message}</p>}
            </div>

            <button type="submit" className="btn btn-sm btn-primary rounded-full mt-3"><FaCircleArrowRight /> Submit</button>

        </form>
    );
};

export default AddandEditFrom;