function Spinner({ small }) {
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={`${
          small ? "w-6 h-6 border-4 border-t-4" : "w-12 h-12 border-8 border-t-8"
        } border-slate-300 rounded-full border-t-slate-900 animate-spin`}
      />
    </div>
  );
}

export default Spinner;
