export default function VastausButton(props) {
    const id = props.data.kyselyId;

  return (
    <button
        onClick={() => {
            props.context.navigate(`/kysely/${id}`);
        }}
        style={{
        padding: "6px 12px",
        background: "#18a72dff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      Vastaa kyselyyn
    </button>
  );
}