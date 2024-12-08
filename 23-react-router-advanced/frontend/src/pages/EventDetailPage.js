import { useParams } from "react-router-dom";

function EventDetailPage() {
  const params = useParams();
  return <>
  <h1>Event detail page</h1>
  <p>{params.item_id}</p>
  </>;
}

export default EventDetailPage;
