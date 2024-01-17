// DetailLapangan.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DetailLapangan = ({ route, navigation }) => {
  // Menerima data lapangan dari navigasi
  const { display_name } = route.params;
  const [namaLapangan, setNamaLapangan] = useState("");
  const [hargaSewa, setHargaSewa] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [telepon, setTelepon] = useState("");
  const [fasilitas, setFasilitas] = useState("");
  let [gambar, setGambar] = useState("");

  useEffect(() => {
    const fetchLapanganData = async () => {
      try {
        const response = await fetch(
          "https://nikkoyudha11.github.io/API-Lapangan/lapangan.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch lapangan data");
        }

        const data = await response.json();
        const lapangan = data.data_lapangan.find(
          (item) => item.nama_lapangan === display_name
        );

        if (lapangan) {
          setNamaLapangan(lapangan.nama_lapangan);
          setHargaSewa(lapangan.harga_sewa);
          setDeskripsi(lapangan.deskripsi_lapangan);
          setFasilitas(lapangan.fasilitas);
          setTelepon(lapangan.telepon);

          if (lapangan.gambar_url) {
            setGambar(lapangan.gambar_url);
          } else {
            console.log('Gambar URL is empty');
          }
          
          if (lapangan.fasilitas== "") {
            setFasilitas("belum terisi");
          }

        } else {
          console.log("Lapangan not found");
        }
      } catch (error) {
        console.error("Error fetching lapangan data:", error);
      }
    };

    fetchLapanganData();
  }, [display_name]);

  // Fungsi untuk menavigasi ke halaman Booking
  const navigateToBooking = () => {
    // Implementasi navigasi ke halaman Booking, Anda bisa menyesuaikan sesuai dengan struktur navigasi Anda
    navigation.navigate("Booking", { namaLapangan });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Tambahkan gambar lapangan dari URL */}
        {gambar ? (
        <Image source={{ uri: gambar }} style={styles.gambarLapangan} />
      ) : (
        <Text>Gambar tidak tersedia</Text>
      )}

        <Text style={styles.namaLapangan}>{namaLapangan}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="pricetag" size={24} color="black" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}> Harga Sewa </Text>
              <Text style={styles.infoText}>Rp.{hargaSewa}/ jam</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="football" size={24} color="black" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Fasilitas</Text>
              <Text style={styles.infoText}>
                {fasilitas}
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="call" size={24} color="black" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Nomor HP</Text>
              <Text style={styles.infoText}>
                {telepon}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.deskripsiLabel}>Deskripsi:</Text>
        <Text style={styles.deskripsiText}>{deskripsi}</Text>

        {/* Tombol Booking */}
        <TouchableOpacity
          style={styles.bookingButton}
          onPress={navigateToBooking}
        >
          <Text style={styles.bookingButtonText}>Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  gambarLapangan: {
    width: "100%",
    height: 200, // Sesuaikan tinggi gambar sesuai kebutuhan
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  namaLapangan: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoTextContainer: {
    marginLeft: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
  },
  deskripsiLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  deskripsiText: {
    fontSize: 16,
    lineHeight: 22,
  },
  bookingButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  bookingButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailLapangan;
