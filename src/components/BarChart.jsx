import React from "react";
import { Doughnut, Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import useStock from "../hooks/useStock";

export const BarChart = () => {
  const { items } = useStock();

 // ========================== DoughnutChart ==========================
  const categoryMap = items.reduce((acc, item) => {
    const categoryName = item.category;

    if (!acc[categoryName]) {
      acc[categoryName] = 0;
    }

    acc[categoryName] += item.quantity;

    return acc;
  }, {});

  // Extrair categorias e quantidades do objeto resultante
  const categories = Object.keys(categoryMap);
  const quantities = Object.values(categoryMap);

  const dataDoug = {
    labels: categories,
    datasets: [
      {
        label: 'Quantidade',
        data: quantities,
        backgroundColor: [
          '#36A2EB', '#9966FF', '#FF6384', '#4BC0C0', '#ffc107',
          '#E14948', '#BA255F', '#4ABD9E', '#F8DD6A', '#145A98',
          '#D682D8', '#42476F', '#F8985B', '#4F7C81', '#000226'
        ],
        borderColor: [
          '#36A2EB', '#9966FF', '#FF6384', '#4BC0C0', '#ffc107',
          '#E14948', '#BA255F', '#4ABD9E', '#F8DD6A', '#145A98',
          '#D682D8', '#42476F', '#F8985B', '#4F7C81', '#000226'
        ],
        borderWidth: 0,
      }
    ]
  };

  const options = {
    layout:{
      padding: 0,
    },
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            maxWidth: 200,
            
            labels: {
              boxWidth: 20,
              padding: 10,
            },
            title: {
              display: false,
              text: "Quantidade por tipos de moveis",
              font: {
                size: 18
            }
            }
      }
    }
  }

  // ========================== BarChart ==========================

  const categoryPriceMap = items.reduce((acc, item) => {
    const categoryName = item.category;
  
    if (!acc[categoryName]) {
      acc[categoryName] = 0;
    }
  
    acc[categoryName] += item.price * item.quantity;
  
    return acc;
  }, {});
  
  const categoriesPrice = Object.keys(categoryPriceMap);
  
  const sortedCategories = categoriesPrice.sort((a, b) => categoryPriceMap[b] - categoryPriceMap[a]);
  const sortedQuantities = sortedCategories.map(category => categoryPriceMap[category]);
  
  const dataPriceBar = {
    labels: sortedCategories,
    datasets: [
      {
        label: 'Valor',
        barThickness: 30,
        data: sortedQuantities,
        backgroundColor: [
          '#36A2EB', '#9966FF', '#FF6384', '#4BC0C0', '#ffc107',
          '#E14948', '#BA255F', '#4ABD9E', '#F8DD6A', '#145A98',
          '#D682D8', '#42476F', '#F8985B', '#4F7C81', '#000226'
        ],
        borderColor: [
          '#36A2EB', '#9966FF', '#FF6384', '#4BC0C0', '#ffc107',
          '#E14948', '#BA255F', '#4ABD9E', '#F8DD6A', '#145A98',
          '#D682D8', '#42476F', '#F8985B', '#4F7C81', '#000226'
        ],
      }
    ]
  };
  

  const optionsBar = {
    plugins: {
        legend: {
            display: true,
            labels: {
              boxWidth: 0,
              padding: 5,
            },
            title: {
              display: false,
              text: "Preço por tipos de moveis",
              font: {
                size: 18
            }
            }
      }
    }
  }

// ========================== RenderChart ==========================

  return ( 
    <div className="chartContent">
      <div className="chart">
        <h1>Preço por tipos de moveis</h1>
        <Bar data={dataPriceBar} options={optionsBar}/>
      </div>
      <div className="chart">
        <h1>Quantidade por tipos de moveis</h1>
        <Doughnut data={dataDoug} options={options} />
      </div>
    </div>
  )
}