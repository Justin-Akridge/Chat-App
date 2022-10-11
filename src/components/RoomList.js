import React, { useEffect, useState } from "react";
import { useHistory } from "react-route-dom";
import {
  Jumbotron,
  Spinner,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import firebase from "../Firebase";

function RoomList() {
  const [room, setRoom] = useState([]);
  const [showLoading, setShowloading] = useState(true);
  const [nickname, setNickname] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      firebase
        .database()
        .ref("rooms/")
        .on("value", (resp) => {
          setRoom([]);
          setRoom(snapshotToArray(resp));
          setShowloading(false);
        });
    };

    fetchData();
  }, []);

  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });
    return returnArr;
  };

  const enterChatRoom = (roomname) => {
    const chat = {
      roomname: "",
      nickname: "",
      message: "",
      date: "",
      type: "",
    };
    chat.roomname = roomname;
    chat.nickname = nickname;
    chat.date = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    chat.message = `${nickname} enter the room`;
    chat.type = "join";
    const newMessage = firebase.database().ref("chats/").push();
    newMessage.set(chat);

    firebase
      .database()
      .ref("roomusers/")
      .orderByChild("roomname")
      .equalTo(roomname)
      .on("value");
  };
}

export default RoomList;
