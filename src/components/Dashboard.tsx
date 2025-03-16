import { HiHome, HiPlus, HiUsers } from "react-icons/hi";
import { RiFoldersFill } from "react-icons/ri";
import { HiDocumentText } from "react-icons/hi2";
import { FaStar } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { FaDollarSign, FaGlobe } from "react-icons/fa";
import { ResponsivePie } from "@nivo/pie";
import { Sidebar } from "flowbite-react";
import { chartDataTwo } from '../Data/dataTwo';
import { ResponsiveLine } from "@nivo/line";
import { chartData } from "../Data/dataOne";
import MainSlider from "./MainSlider";
import Blog from "./Blog";
import AboutUs from "./AboutUs";
import Portfolio from "./Portfolio";
import Reviews from "./Reviews";
import { FaBars } from "react-icons/fa";
import AddProject from "./AddProject";



const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('statistics');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return <>
    <div className="grid grid-cols-1 lg:grid-cols-[20%_80%] h-screen">
        {/* Left hand side*/}
        <FaBars onClick={() => setIsOpen(!isOpen)} className="lg:hidden fixed top-5 left-5 text-3xl text-[#232f3e] z-50 border-2 border-black rounded-full p-1" />
        
        <div className={isOpen?" lg:hidden  bg-[#232f3e] overflow-hidden fixed top-0 left-0 z-30 h-screen":"hidden lg:block bg-[#232f3e] overflow-hidden"}>
         
          <Sidebar
            aria-label="Default sidebar"
            className="bg-[#232F3E] text-white dashboardNav "
          >
            <Sidebar.Items className="bg-[#232f3e] ">
              <Sidebar.ItemGroup className="flex flex-col ml-5">
                <Sidebar.Item
                  onClick={() => setActiveTab("statistics")}
                  icon={FaChartBar}
                  className="cursor-pointer uppercase hover:bg-gray-600 hover:text-gray-200 text-white py-2 px-4 rounded-md"
                >
                  statistics
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => setActiveTab("mainSlider")}
                  icon={HiHome}
                  className="cursor-pointer uppercase hover:bg-gray-700 text-white hover:text-gray-200 py-3 px-4 rounded-lg transition duration-200 ease-in-out"
                >
                  Main Slider
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => setActiveTab("aboutus")}
                  icon={HiUsers}
                  className="cursor-pointer uppercase hover:bg-gray-700 text-white hover:text-gray-200 py-3 px-4 rounded-lg transition duration-200 ease-in-out"
                >
                  About Us
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => setActiveTab("portfolio")}
                  icon={RiFoldersFill}
                  className="cursor-pointer uppercase hover:bg-gray-700 text-white hover:text-gray-200 py-3 px-4 rounded-lg transition duration-200 ease-in-out"
                >
                  Portfolio
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => setActiveTab("addProject")}
                  icon={FaPlus}
                  className="cursor-pointer uppercase hover:bg-gray-700 text-white hover:text-gray-200 py-3 px-4 rounded-lg transition duration-200 ease-in-out"
                >
                  Add project
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => setActiveTab("blog")}
                  icon={HiDocumentText}
                  className="cursor-pointer uppercase hover:bg-gray-700 text-white hover:text-gray-200 py-3 px-4 rounded-lg transition duration-200 ease-in-out"
                >
                  Blog
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => setActiveTab("reviews")}
                  icon={FaStar}
                  className="cursor-pointer uppercase hover:bg-gray-700 text-white hover:text-gray-200 py-3 px-4 rounded-lg transition duration-200 ease-in-out"
                >
                  Reviews
                </Sidebar.Item>
                <Sidebar.Item
                  className="absolute bottom-0 block hover:bg-[#232F3E]  text-white py-3 px-1"
                >
                  <div className="flex flex-col gap-2 items-center ">
                  <h3 className="text-[18px] font-bold">Welcome, Mustafa</h3>
                  <h4 className="text-[14px] text-[#7C7C7C] uppercase">Admin</h4>
                  <button className="bg-gray-700 text-white px-3 py-1 rounded-lg w-[100%]">Sign Out</button>
                  </div>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
          
        </div>
  
        {/* Right hand side*/}
        <div className=" overflow-auto bg-[#edeeee]">
          <div className="col-span-1 md:col-span-10">
            {/* عرض المحتوى بناءً على التبويب النشط */}
            {activeTab === "statistics" && (
              <div className='p-6'>
                <div className="container mx-auto">
                  <div className="bg-white p-6 rounded-lg shadow-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Visitor Info */}
                      <div className="bg-[#E7F3CC] rounded-lg shadow-md p-4">
                        <p className="text-[#232F3E] text-[14px] font-bold mb-2">
                          Number of visitors
                        </p>
                        <p className="text-[rgba(0,0,0,0.25)] text-[10px] p-2 rounded-md mb-4">
                          New Visitors Today
                        </p>
                        <div className="flex justify-between items-center">
                          <HiUsers className="mr-2" />
                          <p className="text-[rgba(9, 158, 49, 1)] text-[24px]">
                            +100
                          </p>
                        </div>
                      </div>
  
                      {/* Sales Info */}
                      <div className="bg-[#E3F2FF] rounded-lg shadow-md p-4">
                        <p className="text-[#232F3E] text-[14px] font-bold mb-2">
                          New Sales
                        </p>
                        <p className="text-[rgba(0,0,0,0.25)] text-[10px] p-2 rounded-md mb-4">
                          New Sales Today
                        </p>
                        <div className="flex justify-between items-center">
                          <FaDollarSign className="mr-2" />
                          <p className="text-[rgba(71, 123, 255, 1)] text-[24px]">
                            + $500
                          </p>
                        </div>
                      </div>
  
                      {/* Projects Info */}
                      <div className="bg-[#FFEAE8] rounded-lg shadow-md p-4">
                        <p className="text-[#232F3E] text-[14px] font-bold mb-2">
                          All Projects
                        </p>
                        <p className="text-[rgba(0,0,0,0.25)] text-[10px] p-2 rounded-md mb-4">
                          All Projects You Have
                        </p>
                        <div className="flex justify-between items-center">
                          <HiPlus className="mr-2" />
                          <p className="text-[rgba(144, 48, 38, 1)] text-[24px]">
                            100
                          </p>
                        </div>
                      </div>
  
                      {/* Shipments Info */}
                      <div className="bg-[#FFF1CA] rounded-lg shadow-md p-4">
                        <p className="text-[#232F3E] text-[14px] font-bold mb-2">
                          Number of Shipments
                        </p>
                        <p className="text-[rgba(0,0,0,0.25)] text-[10px] p-2 rounded-md mb-4">
                          All Shipments You Have
                        </p>
                        <div className="flex justify-between items-center">
                          <FaGlobe className="mr-2" />
                          <p className="text-[rgba(255, 153, 0, 0.74)] text-[24px]">
                            100
                          </p>
                        </div>
                      </div>
  
                      {/* Revenue Chart */}
                      <div className="col-span-1 sm:col-span-2 lg:col-span-2 bg-white rounded-lg shadow-md p-4 mt-3">
                        <h1 className="text-[20px] font-bold">Revenue</h1>
                        <div style={{ width: "100%", height: "300px" }}>
                          <ResponsiveLine
                            data={chartData}
                            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                            xScale={{ type: "point" }}
                            yScale={{
                              type: "linear",
                              min: "auto",
                              max: "auto",
                              stacked: true,
                              reverse: false,
                            }}
                            yFormat=" >-.2f"
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                              tickSize: 5,
                              tickPadding: 5,
                              tickRotation: 0,
                              legend: "transportation",
                              legendOffset: 36,
                              legendPosition: "middle",
                              truncateTickAt: 0,
                            }}
                            axisLeft={{
                              tickSize: 5,
                              tickPadding: 5,
                              tickRotation: 0,
                              legend: "count",
                              legendOffset: -40,
                              legendPosition: "middle",
                              truncateTickAt: 0,
                            }}
                            enablePoints={false}
                            pointSize={10}
                            pointColor={{ theme: "background" }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: "color", modifiers: [] }}
                            pointLabel="data.yFormatted"
                            pointLabelYOffset={-15}
                            enableTouchCrosshair={true}
                            useMesh={true}
                            legends={[]}
                          />
                        </div>
                      </div>
  
                      {/* Market Share Chart */}
                      <div className="col-span-1 sm:col-span-2 lg:col-span-2 bg-white rounded-lg shadow-md p-4">
                        <h1 className="text-[20px] font-bold">Market Share</h1>
                        <div style={{ width: "100%", height: "500px" }}>
                          <ResponsivePie
                            data={chartDataTwo}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.4}
                            padAngle={0.7}
                            cornerRadius={5}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            borderColor={{
                              from: "color",
                              modifiers: [["darker", 0.2]],
                            }}
                            enableArcLinkLabels={false}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#333333"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: "color" }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{
                              from: "color",
                              modifiers: [["darker", 2]],
                            }}
                            defs={[
                              {
                                id: "dots",
                                type: "patternDots",
                                background: "inherit",
                                color: "rgba(255, 255, 255, 0.3)",
                                size: 4,
                                padding: 1,
                                stagger: true,
                              },
                              {
                                id: "lines",
                                type: "patternLines",
                                background: "inherit",
                                color: "rgba(255, 255, 255, 0.3)",
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10,
                              },
                            ]}
                            fill={[
                              { match: { id: "ruby" }, id: "dots" },
                              { match: { id: "javascript" }, id: "dots" },
                              { match: { id: "hack" }, id: "dots" },
                              { match: { id: "python" }, id: "dots" },
                              { match: { id: "php" }, id: "dots" },
                            ]}
                            legends={[
                              {
                                anchor: "bottom",
                                direction: "row",
                                justify: false,
                                translateX: 0,
                                translateY: 56,
                                itemsSpacing: 0,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: "#999",
                                itemDirection: "left-to-right",
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: "circle",
                                effects: [
                                  {
                                    on: "hover",
                                    style: {
                                      itemTextColor: "#000",
                                    },
                                  },
                                ],
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
  
            {/* Display content for other tabs */}
            {activeTab === "mainSlider" && <MainSlider />}
            {activeTab === "blog" && <Blog />}
            {activeTab === "aboutus" && <AboutUs />}
            {activeTab === "portfolio" && <Portfolio />}
            {activeTab === "reviews" && <Reviews />}
            {activeTab === "addProject" && <AddProject />}
          </div>
        </div>
      </div>
    </>;
}

export default Dashboard