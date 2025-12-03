export default function RaporttiButton(props) {
    const id = props.data.kyselyId;

  return (
    <button
        onClick={() => {
            props.context.navigate(`/kysely/${id}/raportti`);
        }}
        style={{
        padding: "6px 12px",
        background: "#d13899ff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      Näytä vastaukset
    </button>
  );
}
