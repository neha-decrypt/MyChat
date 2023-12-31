import { useEffect, useState } from "react";
import { GetMyMessages } from "../../apiServices";
import "./message.css";
import eventEmitter from "../../events/events";

export const Messsages = () => {
  const [messages, setMessage] = useState<any>([]);

  const fetch = async () => {
    let data = await GetMyMessages();
    setMessage(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  eventEmitter.removeAllListeners("ReloadMessage");
  eventEmitter.on("ReloadMessage", async () => {
    await fetch();
  });

  return (
    <>
      <div>Messages</div>
      <table className="custom-table">
        <th>From</th>
        <th>To</th>
        <th>Message</th>
        <th>Create At</th>
        <th>isDelivered</th>
        <th>isRead</th>
        <th>View</th>
        {messages?.length > 0 &&
          messages?.map((m: any, key: any) => {
            return (
              <tr>
                <td>{m?.from}</td>
                <td>{m?.to}</td>
                <td>{m?.message}</td>
                <td>{m?.sentAt}</td>
                <td>{m?.isDelivered ? "yes" : "No"}</td>
                <td>{m?.isRead ? "yes" : "No"}</td>
                <td>
                  <button>View</button>
                </td>
              </tr>
            );
          })}
      </table>
    </>
  );
};
