// // interface FilterSectionProps {
// //   city: string;
// //   sort: string;

// //   setCity: (value: string) => void;
// //   setSort: (value: string) => void;

// //   openModal: () => void;
// // }

// // const FilterSection = ({
// //   city,
// //   sort,
// //   setCity,
// //   setSort,
// //   openModal,
// // }: FilterSectionProps) => {
// //   return (
// //     <div
// //       className="
// //       bg-white
// //       rounded-2xl
// //       shadow-sm
// //       p-4
// //       flex
// //       flex-col
// //       lg:flex-row
// //       gap-4
// //       items-stretch
// //       lg:items-center
// //       justify-between
// //       min-w-7xl
// //     "
// //     >
// //       <div className="flex flex-col md:flex-row gap-4 flex-1">
// //         <select
// //           value={city}
// //           onChange={(e) => setCity(e.target.value)}
// //           className="
// //           border
// //           rounded-xl
// //           px-4
// //           py-3
// //           outline-none
// //           w-full
// //           md:w-80
// //         "
// //         >
// //           <option value="">Select City</option>
// //           <option value="Indore">Indore</option>
// //           <option value="Delhi">Delhi</option>
// //           <option value="Bhopal">Bhopal</option>
// //         </select>

// //         <button
// //           className="
// //           bg-purple-700
// //           hover:bg-purple-800
// //           text-white
// //           rounded-xl
// //           px-6
// //           py-3
// //           transition
// //         "
// //         >
// //           Find Company
// //         </button>

// //         <button
// //           onClick={openModal}
// //           className="
// //           bg-purple-700
// //           hover:bg-purple-800
// //           text-white
// //           rounded-xl
// //           px-6
// //           py-3
// //           transition
// //         "
// //         >
// //           Add Company
// //         </button>
// //       </div>

// //       <select
// //         value={sort}
// //         onChange={(e) => setSort(e.target.value)}
// //         className="
// //         border
// //         rounded-xl
// //         px-4
// //         py-3
// //         outline-none
// //         w-full
// //         lg:w-52
// //       "
// //       >
// //         <option value="">Sort</option>
// //         <option value="rating">Highest Rating</option>

// //         <option value="latest">Latest</option>
// //       </select>
// //     </div>
// //   );
// // };

// // export default FilterSection;

// interface FilterSectionProps {
//   city: string;
//   sort: string;
//   setCity: (value: string) => void;
//   setSort: (value: string) => void;
//   openModal: () => void;
// }

// const FilterSection = ({
//   city,
//   sort,
//   setCity,
//   setSort,
//   openModal,
// }: FilterSectionProps) => {
//   return (
//     <div
//       className="
//       bg-white
//       rounded-2xl
//       shadow-sm
//       p-4
//       flex
//       flex-col
//       lg:flex-row
//       gap-4
//       lg:items-center
//       justify-between
//     "
//     >
//       {/* LEFT SIDE */}
//       <div className="flex flex-col sm:flex-row gap-3 flex-1">
//         <select
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="
//             border
//             rounded-xl
//             px-4 py-3
//             w-full sm:w-60
//             outline-none
//             text-sm
//           "
//         >
//           <option value="">Select City</option>
//           <option value="Indore">Indore</option>
//           <option value="Delhi">Delhi</option>
//           <option value="Bhopal">Bhopal</option>
//         </select>

//         <button
//           className="
//             bg-purple-700
//             hover:bg-purple-800
//             text-white
//             rounded-xl
//             px-5 py-3
//             text-sm
//             transition
//             w-full sm:w-auto
//           "
//         >
//           Find Company
//         </button>

//         <button
//           onClick={openModal}
//           className="
//             bg-slate-900
//             hover:bg-slate-800
//             text-white
//             rounded-xl
//             px-5 py-3
//             text-sm
//             transition
//             w-full sm:w-auto
//           "
//         >
//           Add Company
//         </button>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="w-full lg:w-48">
//         <select
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//           className="
//             border
//             rounded-xl
//             px-4 py-3
//             w-full
//             outline-none
//             text-sm
//           "
//         >
//           <option value="">Sort</option>
//           <option value="rating">Highest Rating</option>
//           <option value="latest">Latest</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default FilterSection;

import { MapPin } from "lucide-react";

interface FilterSectionProps {
  city: string;
  sort: string;
  setCity: (value: string) => void;
  setSort: (value: string) => void;
  openModal: () => void;
}

const FilterSection = ({
  city,
  sort,
  setCity,
  setSort,
  openModal,
}: FilterSectionProps) => {
  return (
    <div className="bg-transparent py-4 flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
      {/* LEFT SIDE Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-end flex-1">
        {/* City Input */}
        <div className="flex flex-col w-full sm:w-72">
          <label className="text-xs text-gray-500 mb-1 ml-1">Select City</label>
          <div className="relative">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="appearance-none border border-gray-300 rounded-md px-4 py-2.5 w-full outline-none text-sm bg-white focus:border-purple-600 transition cursor-pointer"
            >
              <option value="">Select City...</option>
              <option value="Indore">Indore, Madhya Pradesh, India</option>
              <option value="Delhi">Delhi</option>
              <option value="Bhopal">Bhopal</option>
            </select>
            <MapPin
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-700 pointer-events-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <button className="bg-purple-700 hover:bg-purple-800 text-white rounded-md px-6 py-2.5 text-sm font-medium transition w-full sm:w-auto h-[42px]">
          Find Company
        </button>

        <button
          onClick={openModal}
          className="bg-gradient-to-r from-purple-700 to-fuchsia-500 hover:opacity-90 text-white rounded-md px-6 py-2.5 text-sm font-medium transition w-full sm:w-auto h-[42px]"
        >
          + Add Company
        </button>
      </div>

      {/* RIGHT SIDE Control */}
      <div className="flex flex-col w-full sm:w-48 lg:w-40">
        <label className="text-xs text-gray-500 mb-1 ml-1">Sort</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2.5 w-full outline-none text-sm bg-white focus:border-purple-600 transition cursor-pointer"
        >
          <option value="">Name</option>
          <option value="rating">Highest Rating</option>
          <option value="latest">Latest</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;