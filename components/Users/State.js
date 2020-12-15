import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

function State() {
  const [token, setToken] = useState(undefined);
  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        // Send token to your backend via HTTPS
        // ...
        setToken(idToken);
      })
      .catch(function (error) {
        // Handle error
      });
  }, []);
  return (
    <Panel header="Token" bordered>
      <FormGroup>
        <Input
          componentClass="textarea"
          rows={15}
          style={{ width: 750 }}
          value={token || ""}
          readOnly
        />
      </FormGroup>
      <ButtonGroup style={{ marginTop: "2rem" }}>
        <Button onClick={() => firebase.auth().signOut()}>Cerrar sesión</Button>
      </ButtonGroup>
    </Panel>
  );
}

export default State;
