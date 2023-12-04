import { useForm, Controller } from "react-hook-form"
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { FaCircleArrowRight } from "react-icons/fa6";
import axiosInstance from "../../../axiosConfig";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import movieImg from '../../assets/images/movieImg.png';
import { mutate } from "swr";


const AddandEditFrom = ({ editData,mutate }) => {
    const movie = editData || null
    const [imagePreview, setImagePreview] = useState(null);
    const { register, handleSubmit, reset, setValue, setError, formState: { errors } } = useForm()
//  console.log(movie);
//  console.log(errors);
    const categoryOptions = [
        { value: '', text: '--Select Movie Category--' },
        { value: '2D', text: '2D' },
        { value: '3D', text: '3D' },

    ];
    useEffect(() => {
        if (movie) {
            setValue('_id',movie._id)
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
        const file =e.target.files[0];
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
        console.log(data.movieImage);
        const formData = new FormData();
        formData.append("movieImage", data.movieImage[0] );
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
                }
                if (res.data.code == 200) {
                    toast.success(res.data.message)
                    reset()
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleUpdate = (data) => {
        const formData = new FormData();
        if(data.movieImage.length>0){
            formData.append("movieImage", data.movieImage[0]);
        }else{
            delete data['movieImage']
        }
        
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
                if (res.data.code == 200) {
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
            <form onSubmit={handleSubmit(movie ? handleUpdate : handleStoreMovie)}>
            <input type="hidden" {...register('_id')} />
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
                        <Flatpickr {...register('releaseDate', { required: "The field is required." })} className="input input-bordered w-full " placeholder="Release Date" options={{ dateFormat: 'd-M-Y', static: true, enableTime: false }}
                            onChange={(day, date, instance) => setValue('releaseDate', date)} />

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

                <div className="flex flex-col md:flex-row gap-5">
                    <div className="form-control w-full ">
                        <div className="mt-3">
                            <img src={imagePreview?imagePreview:movieImg} className="w-28 h-28 outline outline-1 outline-indigo-500 rounded-md" alt="" />
                        </div>
                        <label className="label">
                            <span className="label-text">Movie Duration</span>
                        </label>
                        {
                            movie ? <input type="file" {...register('movieImage', { required:false })} className="file-input file-input-bordered file-input-primary w-full " onChange={(e)=>handleFileChange(e)} /> : <input type="file" {...register('movieImage',{ required: "The field is required." })} className="file-input file-input-bordered file-input-primary w-full " onChange={(e)=>handleFileChange(e)} />
                        }
                        {errors?.movieImage && <p className="text-red-400">{errors.movieImage.message}</p>}

                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea {...register('description', { required: "The field is required" })} className="textarea textarea-primary h-full" placeholder="Bio"></textarea>
                        {errors?.description && <p className="text-red-400">{errors.description.message}</p>}
                    </div>
                </div>
                <button type="submit" className="btn btn-sm btn-primary rounded-full mt-3"><FaCircleArrowRight /> {movie ? 'update' : 'submit'}</button>

            </form>


        </>
    );
};

export default AddandEditFrom;