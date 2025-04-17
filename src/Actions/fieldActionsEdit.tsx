interface FieldActionProps {
  display: boolean; // Ensure 'display' is a string
}

function FieldActionEdit({ display }: FieldActionProps) {
  return (
    <div
      style={{
        textAlign: "start",
        marginTop: "5px",
        position: "relative",
        right: "10px",
        display: display ? "block" : "none", // Ensure valid values like 'none' or 'block'
      }}
    >
      <span style={{ color: "red", fontFamily: "Amiri" }}>
        الرجاء ملئ الحقل
      </span>
    </div>
  );
}

export default FieldActionEdit;
