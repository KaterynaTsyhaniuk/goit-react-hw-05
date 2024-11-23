import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <InfinitySpin
        visible={true}
        width="150"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
