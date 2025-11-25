export default function RaporttiButton(props) {
    const id = props.data.kyselyId;

  return (
    <button
        onClick={() => {
            props.context.navigate(`/kysely/${id}/raportti`);
        }}
        style={{
        padding: "6px 12px",
        background: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      Näytä raportti
    </button>
  );
}
