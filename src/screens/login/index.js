import React, { Component, createRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: "",
      userPassword: "",
    };
  }

  componentDidMount = async () => {
    this._getData();
  };

  _getData = async () => {
    try {
      const value = await AsyncStorage.getItem("admin");
      if (value !== null) {
        this.props.navigation.replace("Home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  _submit = async () => {
    // setErrortext("");
    if (!this.state.userEmail) {
      alert("Email tidak boleh kosong!");
      return;
    }
    if (!this.state.userPassword) {
      alert("Password tidak boleh kosong!");
      return;
    }
    let dataToSend = {
      user_email: this.state.userEmail,
      user_password: this.state.userPassword,
    };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    this._getLogin();
  };

  _getLogin = async () => {
    try {
      let response = await fetch(
        "https://siswa.lumbangrejo.com/api/wali?email=" +
          this.state.userEmail +
          "&password=" +
          this.state.userPassword
      );
      let json = await response.json();
      try {
        await AsyncStorage.setItem("email", json.data[0].email);
        await AsyncStorage.setItem("nama", json.data[0].namaSiswa);
        await AsyncStorage.setItem("nis", json.data[0].nis);
        await AsyncStorage.setItem("idKelas", json.data[0].idKelas);
        await AsyncStorage.setItem("idSekolah", json.data[0].idSekolah);
        await AsyncStorage.setItem("admin", "login");
        this.props.navigation.replace("Home");
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      console.error(error);
    }
  };

  onChangeEmail = (value) => {
    this.setState({
      userEmail: value,
    });
  };

  onChangePass = (value) => {
    this.setState({
      userPassword: value,
    });
  };

  render() {
    const passwordInputRef = createRef();

    return (
      <View style={styles.mainBody}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View>
            <KeyboardAvoidingView enabled>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{
                    uri:
                      "https://fpik.unpatti.ac.id///wp-content/uploads/2019/09/school-3158985_960_720.png",
                  }}
                  style={{
                    width: "50%",
                    height: 200,
                    resizeMode: "contain",
                    margin: 30,
                  }}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(value) => this.onChangeEmail(value)}
                  placeholder="Enter Email" //dummy@abc.com
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  value={this.state.userEmail}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(value) => this.onChangePass(value)}
                  placeholder="Enter Password" //12345
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                  value={this.state.userPassword}
                />
              </View>
              {/* {errortext != "" ? (
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              ) : null} */}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => this._submit()}
              >
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#307ecc",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
