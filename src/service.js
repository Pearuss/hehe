import Swal from "sweetalert2";

export const followTopics = (tokens, topic) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch(`${process.env.REACT_APP_API_URL}/notification/topic/follow`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      tokens,
      topicId: topic,
    }),
  })
    .then((response) => response.text())
    .then(() => Swal.fire("Success!", "You followed this topic!", "success"))
    .catch((error) => console.log("error", error));
};

export const unFollowTopics = (tokens, topic) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  fetch(`${process.env.REACT_APP_API_URL}/notification/topic/follow`, {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify({
      tokens,
      topicId: topic,
    }),
  })
    .then((response) => response.text())
    .then(() => Swal.fire("Done!", "You unfollowed this topic!", "success"))
    .catch((error) => console.log("error", error));
};

export const pushNotiToken = (title, body, tokens) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    tokens,
    title,
    body,
    image: "image",
    data: {},
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${process.env.REACT_APP_API_URL}/notification/tokens`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const pushNotiTopic = (title, body, topicId) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch(`${process.env.REACT_APP_API_URL}/notification`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      title,
      body,
      image: "image",
      data: {},
      topicId,
    }),
    redirect: "follow",
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
