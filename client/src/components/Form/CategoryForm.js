import React from "react";

function CategoryForm({handleSubmit, value, setValue}) {
  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col gap-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category Name
          </label>
          <input
            type="name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Category here..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-black bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default CategoryForm;
