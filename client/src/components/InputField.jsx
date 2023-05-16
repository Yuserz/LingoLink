import React from "react";

export default function InputField(props) {

  return (
    <div className="input-field">
      <input className="w-full text-black px-3 py-3 bg-white rounded-xl border border-solid outline-gray-300" {...props} />
    </div>
  );
}
