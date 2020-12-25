import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nis: "",
      nama: "",
      kelas: "",
      sekolah: "",
      idKelas: "",
      idSekolah: "",
    };
  }

  componentDidMount() {
    this._getData();
  }

  _getData = async () => {
    try {
      let nis = await AsyncStorage.getItem("nis");
      let nama = await AsyncStorage.getItem("nama");
      let kelas = await AsyncStorage.getItem("idKelas");
      let sekolah = await AsyncStorage.getItem("idSekolah");
      this.setState({
        nis: nis,
        nama: nama,
        idKelas: kelas,
        idSekolah: sekolah,
      });
    } catch (e) {
      console.log(e);
    }
    try {
      let response = await fetch(
        "http://siswa.lumbangrejo.com/api/kelas?idKelas=" + this.state.idKelas
      );
      let json = await response.json();
      this.setState({
        kelas: json[0].namaKelas,
      });
    } catch (error) {
      console.error(error);
    }
    try {
      let response = await fetch(
        "http://siswa.lumbangrejo.com/api/sekolah?idSekolah=" +
          this.state.idSekolah
      );
      let json = await response.json();
      this.setState({
        sekolah: json[0].namaSekolah,
      });
    } catch (error) {
      console.error(error);
    }
  };

  removeValue = async () => {
    try {
      await AsyncStorage.clear();
      this.props.navigation.replace("Login");
    } catch (e) {
      console.log(e);
    }
    console.log("Logout");
  };

  render() {
    const { nis, nama, sekolah, kelas } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.col}>
          <View style={styles.cardHeader}>
            <Text style={styles.textHeader}>Pofil Siswa</Text>
          </View>
          <View style={styles.cardContent}>
            <Image
              style={styles.imgProfile}
              source={{
                uri: "https://img.icons8.com/bubbles/2x/user-male.png",
              }}
            />
            <View style={styles.textPofile}>
              <View>
                <Text style={styles.text}>Nis</Text>
                <Text style={styles.text}>Nama</Text>
                <Text style={styles.text}>Kelas</Text>
                <Text style={styles.text}>Sekolah</Text>
              </View>
              <View>
                <Text style={styles.text}> :</Text>
                <Text style={styles.text}> :</Text>
                <Text style={styles.text}> :</Text>
                <Text style={styles.text}> :</Text>
              </View>
              <View>
                <Text style={styles.text}> {nis}</Text>
                <Text style={styles.text}> {nama}</Text>
                <Text style={styles.text}> {kelas}</Text>
                <Text style={styles.text}> {sekolah}</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardFoot}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.removeValue()}
            >
              <Ionicons name={"md-log-out"} size={26} color={"#e1e1e1"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e1e1",
  },
  col: {
    alignItems: "center",
  },
  cardHeader: {
    width: "100%",
    height: 60,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: "#c0c0c0",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    width: "90%",
    height: 400,
    backgroundColor: "#FFF",
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cardFoot: {
    width: "90%",
    height: 100,
    backgroundColor: "#FFF",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  imgProfile: {
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 100,
  },
  textPofile: {
    marginTop: 20,
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  btn: {
    width: 40,
    height: 40,
    marginBottom: 20,
    marginRight: 20,
    backgroundColor: "black",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
