import React, { useState } from "react";
import Modal from "./Modal";

export default function ModalSelectButton({
  initialSelection = {},
  options,
  color = "rgb(31, 119, 180)",
  onSelectOption = () => {},
  nameAccessor = (d) => d.name,
}) {
  const [selection, setSelection] = useState(initialSelection);
  const [selections, setSelections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onSelect, setOnSelect] = useState(() => {});
  const handleClick = () => {
    setSelections(options);
    setOnSelect(() => (d) => {
      onSelectOption(d);
      setSelection(d);
      setIsModalOpen(false);
    });
    setIsModalOpen(true);
  };
  return (
    <div className="modal-selector">
      <button onClick={handleClick} style={{ backgroundColor: color }}>
        {nameAccessor(selection)}
      </button>
      {isModalOpen && (
        <Modal
          selections={selections}
          onSelect={onSelect}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
