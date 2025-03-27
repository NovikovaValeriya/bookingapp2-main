
import React, { useState, useCallback, useEffect, useRef } from "react";
import {View,Text,Image,StyleSheet,TouchableOpacity,Modal,TextInput,ScrollView,Keyboard,} from "react-native";
interface BookingProps {
    route?: any;
}
import { Link } from "expo-router";
const Booking: React.FC<BookingProps> = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
    const [guestCount, setGuestCount] = useState(0);
    const [comment, setComment] = useState("");
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const scrollViewRef = useRef(null);
    const displayStartDate = "4 июн.";
    const displayEndDate = "7 июн.";
    const numberOfNights = 3;
    const [paymentModalVisible, setPaymentModalVisible] = useState(false); 
    const [paymentSuccess, setPaymentSuccess] = useState(false); 

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => setKeyboardVisible(true)
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => setKeyboardVisible(false)
      );
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);
  
    const openModal = useCallback(() => {
      setModalVisible(true);
    }, []);
  
    const openPaymentModal = () => {
      setPaymentModalVisible(true);
    };
  
    const closePaymentModal = () => {
      setPaymentModalVisible(false);
    };
    const handlePayment = () => {
      setPaymentSuccess(true);
    };

    const handleReturnToMain = () => {
      setPaymentSuccess(false);
      closePaymentModal();
    };
  
    return (
      <View style={styles.mainContainer}>
        {/* ScrollView для прокрутки содержимого */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Ваше текущее содержимое */}
            <View style={styles.selectedDatesSection}>
              <Text style={styles.sectionTitle}>г. Тюмень, Мельникайте, д. 70</Text>
              <View style={styles.dateRange}>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>{displayStartDate}</Text>
                  <View style={styles.timeBox}>
                    <Text style={styles.timeTextValue}>00:50</Text>
                  </View>
                </View>
                <View style={styles.centerContent}>
                  <Image
                    source={require("../assets/images/dots.png")}
                    style={styles.separatorImage}
                  />
                  <Text style={styles.nightsText}>
                    {numberOfNights} {numberOfNights > 4 ? `ночей` : "ночи"}
                  </Text>
                </View>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>{displayEndDate}</Text>
                  <View style={styles.timeBox}>
                    <Text style={styles.timeTextValue}>00:50</Text>
                  </View>
                </View>
              </View>
              <View style={styles.textColumn}>
                <Text style={styles.InOutText}>Заезд</Text>
                <Text style={styles.dateSubText}>
                  4-го июня 2025 в 0:50 по тюмени
                </Text>
                <Text style={styles.InOutText}>Выезд</Text>
                <Text style={styles.dateSubText}>
                  7-го июня 2025 в 0:50 по тюмени
                </Text>
              </View>
            </View>
  
            <View style={styles.guestSection}>
              <Text style={styles.guestText}>Укажите количество гостей</Text>
              <TouchableOpacity style={styles.addGuestButton} onPress={openModal}>
                <Text style={styles.addGuestText}>
                  {guestCount > 0 ? `${guestCount} гостей` : "+ Добавить"}
                </Text>
              </TouchableOpacity>
            </View>
  
            <View style={styles.warningContainer}>
              <Text style={styles.warningContainerTitle}>Обратите внимание:</Text>
              <Text style={styles.warningContainerMainText}>
                По договору аренды действует тариф «Всё включено»
              </Text>
              <Text style={styles.warningContainerMainText}>
                Если по какой-либо причине ваша поездка не состоится, вернуть
                средства можно прямо в приложении или через тех. поддержку.
              </Text>
              <Text style={styles.warningContainerMainText}>
                Контакты тех. поддержки:
              </Text>
              <Text style={styles.warningContainerContacts}>
                Тел.: 8(800)000-00-00 {"\n"} Telegramm: @anni_landing_bot
              </Text>
            </View>
  
            <View style={styles.warningContainer}>
              <Text style={styles.warningContainerTitle}>Комментарий</Text>
              <TextInput
                style={styles.input}
                placeholder="Здесь можно написать о своих предпочтениях и пожеланиях"
                placeholderTextColor="#999"
                multiline={true}
                value={comment} 
                onChangeText={setComment} 
                onFocus={() => {
                  
                  scrollViewRef.current?.scrollTo({ y: 500, animated: true });
                }}
              />
            </View>
          </View>
        </ScrollView>
  
        {/* Фиксированная кнопка внизу экрана */}
        {!keyboardVisible && (
          <View style={styles.fixedContainer}>
            <Text style={styles.fixedContainerText}>К оплате 4734₽</Text>
            <View style={styles.rowContainer}>
              <Text style={styles.fixedContainerMainText}>Нажимая «Оплатить»,</Text>
              <TouchableOpacity style={styles.payButton} onPress={openPaymentModal}>
                <Text style={styles.payButtonText}>Оплатить</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.fixedContainerMainText}>
              вы принимаете условия:{" "}
            </Text>
            <Link style={styles.Link} href="/details">
              Договора аренды{" "}
            </Link>
            <Link style={styles.Link} href="/details">
              Согласие на сохранение данных
            </Link>
          </View>
        )}
  
        {/* Модальное окно оплаты */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={paymentModalVisible}
          onRequestClose={closePaymentModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalOverlay} />
            <View style={[styles.modalView, { height: "40%" }]}>
              <View style={styles.tinkoffLogoContainer}>
                 <Image
                  source={require("../assets/images/tinfoff.png")} 
                  style={styles.tinkoffLogo}
                 />
              </View>
              {!paymentSuccess ? (
                <>
                  <Text style={styles.paymentLabel}>К оплате</Text>
                  <Text style={styles.paymentAmount}>4734₽</Text>
                  <TouchableOpacity
                    style={styles.payWithCardButton}
                    onPress={handlePayment}
                  >
                    <Text style={styles.payWithCardText}>Оплатить картой</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.paymentSuccessText}>Оплата прошла</Text>
                  <Text style={styles.paymentSuccessTitle}>Успешно</Text>
                  <TouchableOpacity
                    style={styles.returnToMainButton}
                    onPress={handleReturnToMain}
                  >
                    <Text style={styles.returnToMainText}>
                      Вернуться на главную
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20, 
      paddingVertical: 10, 
    },
    mainContainer: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1, 
      paddingBottom: 100, 
    },
    selectedDatesSection: {
      backgroundColor: "white",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "#ddd",
      width: "100%", 
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.1, 
      shadowRadius: 4, 
      elevation: 9, 
    },
    sectionTitle: {
      fontSize: 16, 
      fontWeight: "bold", 
      color: "#333", 
      marginBottom: 0, 
      textAlign: "left",
    },
    dateRange: {
      flexDirection: "row",
      justifyContent: "space-between", 
      alignItems: "center",
      marginBottom: 16, 
    },
    dateContainer: {
      alignItems: "center",
    },
    dateText: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 15,
    },
    timeBox: {
      backgroundColor: "#FAF0E6",
      borderRadius: 8,
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginTop: 14,
    },
    timeTextValue: {
      fontSize: 14,
      color: "#777",
    },
    imageContainer: {
      alignItems: "center", 
      marginBottom: 1, 
    },
    separatorImage: {
      width: 170, 
      height: 60, 
      resizeMode: "contain", 
      marginTop: -1,
    },
    nightsText: {
      fontSize: 16,
      color: "#777",
      textAlign: "center", 
    },
    guestSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 10,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    guestText: {
      fontSize: 16,
      color: "#333",
    },
    addGuestButton: {
      backgroundColor: "transparent",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    addGuestText: {
      color: "rgb(230, 147, 51)",
      fontWeight: "bold",
    },
    InOutText: {
      fontSize: 14,
      color: "#777",
      textAlign: "center",
      marginTop: 4, 
    },
    centerContent: {},
    textColumn: {
      flexDirection: "column", 
      alignItems: "flex-start", 
      justifyContent: "center", 
      marginHorizontal: 8, 
    },
    dateSubText: {
      fontSize: 14,
    },
    warningContainer: {
      backgroundColor: "white",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "#ddd",
      flexDirection: "column", 
      alignItems: "flex-start", 
      width: "100%", 
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1, 
      shadowRadius: 4, 
      elevation: 9, 
    },
    warningContainerTitle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    warningContainerMainText: {
      fontSize: 15,
      paddingTop: 10,
    },
    warningContainerContacts: {
      fontSize: 15,
      paddingTop: 10,
      color: "#EB6200",
    },
    input: {
      height: 100,
      width: "100%", 
      backgroundColor: "#F6F6F8", 
      borderRadius: 10, 
      padding: 10, 
      marginTop: 10, 
      textAlignVertical: "top", 
      fontSize: 14,
      color: "#333", 
      borderWidth: 0, 
      borderColor: "#ddd", 
    },
    fixedContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#FF852D", 
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: "#ddd",
      borderRadius: 25,
    },
    fixedContainerText: {
      color: "#FEFEFE",
      fontSize: 16,
      fontFamily: "Montserrat",
      fontWeight: "bold",
    },
    fixedContainerMainText: {
      color: "#FEFEFE",
    },
    Link: {
      color: "#FEFEFE",
      textDecorationLine: "underline",
    },
    payButton: {
      backgroundColor: "white", 
      paddingVertical: 15,
      paddingHorizontal: 16,
      borderRadius: 60,
    },
    payButtonText: {
      color: "#FF852D",
      fontSize: 16,
      fontWeight: "bold",
    },
    rowContainer: {
      flexDirection: "row", 
      justifyContent: "space-between",
      alignItems: "center", 
      marginBottom: -20,
    },
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    modalOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "115%",
      backgroundColor: "rgba(0, 0, 0, 0.5)", 
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 25,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: "100%", 
      maxHeight: '37%', 
      justifyContent: "space-evenly",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    tinkoffLogo: {
      width: 91, 
      height: 35, 
      resizeMode: "contain",
      marginBottom: 20,
    },
    paymentAmount: {
      fontSize: 35,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 20,
    },
    paymentLabel:{
      fontSize: 15,
      color: "#a0a0a0", 
      marginBottom: 10,
      textAlign: "center",
    },
    payWithCardButton: {
        backgroundColor: "#FFDA00", 
        borderRadius: 14,
        paddingVertical: 15,
        paddingHorizontal: 50,
        elevation: 3,
    },
    payWithCardText: {
      color: "#000",
      textAlign: "center",
      fontSize: 16,
    },
    paymentSuccessText: {
      fontSize: 15,
      color: "#a0a0a0", 
      marginBottom: 10,
      textAlign: "center",
    },
    paymentSuccessTitle: {
      fontSize: 35,
      fontWeight: "bold",
      fontFamily:"inter",
      textAlign: "center",
    },
    returnToMainButton: {
      backgroundColor: "#FFDA00", 
      borderRadius: 14,
      paddingVertical: 15,
      paddingHorizontal: 50,
      elevation: 3,
      marginTop: 20,
    },
    returnToMainText: {
      color: "#000",
      textAlign: "center",
      fontSize: 16,
    },
    tinkoffLogoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
  });

  export default Booking;
  