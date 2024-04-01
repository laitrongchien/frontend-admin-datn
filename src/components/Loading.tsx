"use client";

import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full h-full flex-col flex-center">
      <TailSpin
        height="50"
        width="50"
        color="#03c9d7"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p className="text-sm mt-2 font-semibold text-primary">Loading....</p>
    </div>
  );
};

export default Loading;
