// BarChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(...registerables);

export const Chart = () => {
  const { myBlogs } = useSelector((state) => state.blog);
  const Travel = myBlogs && myBlogs?.filter((blog) => blog.category === "Travel");
  const Technology =
    myBlogs && myBlogs?.filter((blog) => blog.category === "Technology");
  const HealthAndFood =
    myBlogs && myBlogs?.filter((blog) => blog.category === "Food & Health");
  const Lifestyle =
    myBlogs && myBlogs?.filter((blog) => blog.category === "Lifestyle");
  const Economics =
    myBlogs && myBlogs?.filter((blog) => blog.category === "Economics");
  const Business =
    myBlogs && myBlogs?.filter((blog) => blog.category === "Business");
  const Sports = myBlogs && myBlogs?.filter((blog) => blog.category === "Sports");

  const excludedCategory = [
    "Lifestyle",
    "Economics",
    "Business",
    "Sports",
    "Food & Health",
    "Travel",
    "Technology",
  ];

  const Others =
    myBlogs &&
    myBlogs?.filter((blog) => !excludedCategory.includes(blog?.category));
    console.log(Travel.length , Travel , Others.length , Others)
  const data = {
    labels: [
      "Lifestyle",
      "Economics",
      "Business",
      "Sports",
      "Food & Health",
      "Travel",
      "Technology",
      "Others",
    ],
    datasets: [
      {
        label: "Category Of Blogs",
        data: [
          Lifestyle && Lifestyle.length > 0 ? Lifestyle.length : 0,
          Economics && Economics.length > 0 ? Economics.length : 0,
          Business && Business.length > 0 ? Business.length : 0,
          Sports && Sports.length > 0 ? Sports.length : 0,
          HealthAndFood && HealthAndFood.length > 0 ? HealthAndFood.length : 0,
          Travel && Travel.length > 0 ? Travel.length : 0,
          Technology && Technology.length > 0 ? Technology.length : 0,
          Others && Others.length > 0 ? Others.length : 0,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(25, 159, 29, 0.2)",
          "rgba(25, 23, 238, 0.2)" ,
          "rgba(18, 159, 297, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(25, 100, 29, 0.2)",
          "rgba(25, 23, 200, 0.2)" ,
          "rgba(18, 1100, 250, 0.2)"
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Disable the default legend
      },
      title: {
        display: true,
        text: 'Category Of Blogs',
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="h-[70vh] w-full">
        <Doughnut data={data} options={options} />
      </div>
      <div className="flex flex-row justify-around w-full mt-4">
        {data.labels.map((label, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-4 h-4 mr-2"
              style={{
                backgroundColor: data.datasets[0].backgroundColor[index],
                borderRadius: '50%',
              }}
            ></div>
            <span>{label}: {data.datasets[0].data[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
