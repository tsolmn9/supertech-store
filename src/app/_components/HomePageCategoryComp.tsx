import { Category } from "../page";

export const CategoryComponent = ({
  categoryData,
}: {
  categoryData: Category;
}) => {
  return (
    <div className="flex flex-col gap-4 font-flame">
      {categoryData?.map((data, index) => {
        return (
          <button
            className="transition-all duration-300 w-[250px] flex h-[66px] bg-white items-center border-2 rounded-2xl p-4 hover:bg-[rgb(80,35,20)] hover:text-white hover:bg-opacity-[0.8] hover:cursor-pointer"
            key={index}
          >
            <img src={data.categoryImg} className="w-1/3 bg-inherit" />
            <div className="w-2/3 text-xl font-flame font-bold">
              {data.categoryName}
            </div>
          </button>
        );
      })}
    </div>
  );
};
