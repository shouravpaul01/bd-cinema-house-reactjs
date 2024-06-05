import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { FaArrowRotateRight, FaCirclePlus } from "react-icons/fa6";
import axiosInstance from "../../../axiosConfig";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import blankImage from "../../assets/images/movieImg.png";
import {
  categoryOptions,
  genreOptions,
  languageOptions,
} from "../../utils/utils";

const AddandEditMovieForm = ({ editData, mutate }) => {
  const movie = editData || null;
  const [imagePreview, setImagePreview] = useState(null);
  const [isBtnDisable, setIsBtnDisable] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (movie) {
      setValue("_id", movie._id);
      setValue("title", movie.title);
      setValue("director", movie.director);
      setValue("releaseDate", movie.releaseDate);
      setValue("category", movie.category);
      setValue(
        "actors",
        movie?.actors?.map((actor) => {
          return { value: actor, label: actor };
        })
      );
      setValue(
        "genres",
        movie?.genres?.map((genre) => {
          return { value: genre, label: genre };
        })
      );
      setValue("duration", movie.duration);
      setValue("rating", movie.rating);
      setValue(
        "languages",
        movie?.languages?.map((language) => {
          return { value: language, label: language };
        })
      );
      setValue("description", movie.description);
    }
  }, [movie]);
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
    setIsBtnDisable(true);
    data.actors = data.actors.map((actor) => actor.value);
    data.genres = data.genres.map((genre) => genre.value);
    data.languages = data.languages.map((language) => language.value);
    data.duration = parseInt(data.duration);
    data.rating = parseFloat(data.rating);

    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append("newMovie", JSON.stringify(data));
    console.log(data);
    axiosInstance
      .post("/movies/create-movie", formData)
      .then((res) => {
        if (res.status == 200) {
          setIsBtnDisable(false);
          mutate();
          toast.success(res.data.message);
          setImagePreview(null);
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err?.response.status == 400) {
          err?.response.data?.errorSources?.map((element) => {
            setError(element.path, {
              type: "manual",
              message: element.message,
            });
          });
          setIsBtnDisable(false);
        }
      });
  };
  const handleUpdate = (data) => {
    data.actors = data.actors.map((actor) => actor.value);
    data.genres = data.genres.map((genre) => genre.value);
    data.languages = data.languages.map((language) => language.value);
    data.duration = parseInt(data.duration);
    data.rating = parseFloat(data.rating);

    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append("newMovie", JSON.stringify(data));
    console.log(data);
    axiosInstance
      .patch(`/movies/${data._id}`, formData)
      .then((res) => {
        if (res.status == 200) {
          toast.success(res.data.message);
          mutate();
          reset();
          document.getElementById(data._id).close();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err?.response.status == 400) {
          err?.response.data?.errorSources?.map((element) => {
            setError(element.path, {
              type: "manual",
              message: element.message,
            });
          });
          setIsBtnDisable(false);
        }
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(movie ? handleUpdate : handleStoreMovie)}
        className="p-4 md:p-6"
      >
        {movie && <input type="hidden" {...register("_id")} />}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Movie Title</span>
            </label>
            <input
              type="text"
              {...register("title", { required: "The field is required." })}
              placeholder="Movie title"
              className="input input-bordered input-primary w-full "
            />
            {errors?.title && (
              <p className="text-red-400">{errors.title.message}</p>
            )}
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Release Date</span>
            </label>
            <Controller
              control={control}
              name="releaseDate"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  options={{ dateFormat: "d-M-Y", static: true }}
                  onChange={(selectedDates, dateStr, ins) => {
                    setValue("releaseDate", selectedDates[0]),
                      console.log(selectedDates);
                  }}
                  className="input input-bordered input-primary w-full "
                  placeholder="Release Date"
                />
              )}
            />

            {errors?.releaseDate && (
              <p className="text-red-400">{errors.releaseDate.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Director</span>
            </label>
            <input
              type="text"
              {...register("director", { required: "The field is required." })}
              placeholder="Director"
              className="input input-bordered input-primary w-full "
            />
            {errors?.director && (
              <p className="text-red-400">{errors.director.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-primary w-full "
              {...register("category", { required: "The field is required" })}
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors?.category && (
              <p className="text-red-400">{errors.category.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Movie Duration</span>
            </label>
            <input
              type="number"
              {...register("duration", {
                required: "The field is required",
              })}
              placeholder="Movie Duration"
              className="input input-bordered input-primary w-full "
            />
            {errors?.duration && (
              <p className="text-red-400">{errors.duration.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <input
              type="text"
              {...register("rating", {
                required: "The field is required",
              })}
              placeholder="Rating"
              className="input input-bordered input-primary  w-full "
            />
            {errors?.rating && (
              <p className="text-red-400">{errors.rating.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 z-10">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Actors</span>
            </label>

            <Controller
              name="actors"
              control={control}
              defaultValue={null}
              rules={{ required: "The field is required" }}
              render={({ field }) => <CreatableSelect {...field} isMulti />}
            />
            {errors?.actors && (
              <p className="text-red-400">{errors.actors.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Genres</span>
            </label>

            <Controller
              name="genres"
              control={control}
              defaultValue={""}
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
            {errors?.genres && (
              <p className="text-red-400">{errors.genres.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Language</span>
            </label>
            <Controller
              name="languages"
              control={control}
              defaultValue={""}
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
            {errors?.language && (
              <p className="text-red-400">{errors.languages.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Movie Image</span>
            </label>
            {editData ? (
              <>
                <img
                  src={imagePreview ? imagePreview : editData?.image?.url}
                  className="w-28 h-28 bg-white outline outline-1 outline-indigo-500 rounded-md mb-2"
                />
                <input
                  type="file"
                  {...register("image")}
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full "
                />
              </>
            ) : (
              <>
                <img
                  src={imagePreview ? imagePreview : blankImage}
                  className="w-28 h-28 bg-white outline outline-1 outline-indigo-500 rounded-md mb-2"
                />
                <input
                  type="file"
                  {...register("image")}
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full "
                />
              </>
            )}
            {errors?.image && (
              <p className="text-red-400">{errors.image.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description", {
                required: "The field is required",
              })}
              className="textarea textarea-primary h-full"
              placeholder="Bio"
            ></textarea>
            {errors?.description && (
              <p className="text-red-400">{errors.description.message}</p>
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="btn px-8  btn-primary "
            disabled={isBtnDisable}
          >
            {movie ? <FaArrowRotateRight /> : <FaCirclePlus />}
            {editData ? "Úpdate" : "Add"}
          </button>
          {isBtnDisable && (
            <span className="loading loading-spinner text-primary loading-lg"></span>
          )}
        </div>
      </form>
    </>
  );
};

export default AddandEditMovieForm;
