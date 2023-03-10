import React, {Fragment} from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../navigation/Navigation";
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from "@react-navigation/native";
import {SignupStepper} from "./sign-up-stepper/SignupStepper";
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../../common/language-selection/LanguageSelector';


type LogoutProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: (props: LogoutProps) => JSX.Element = () => {
  const {t} = useTranslation('translation')
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.goBack()
  }

  return (
    <Fragment>
      <SafeAreaView style={styles.upperUnsafeAreaView}/>

      <SafeAreaView style={styles.container}>

        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <LinearGradient colors={['#FDFDFD', '#FECFA0']} style={styles.titleLinearGradient}>
            <View style={styles.titleWrapper}>
              <View style={styles.title}>
                <Text style={styles.epiprestoTitle}>
                  {t('signUp.sign')}
                  <Text style={{color: "#FFAA55"}}>
                    {t('signUp.up')}
                  </Text>
                </Text>
              </View>
              <View style={styles.languageSelector}>
                <LanguageSelector />
              </View>
            </View>
          </LinearGradient>
          <LinearGradient colors={['#FECFA0', '#FFAA55']} style={styles.formWrapperGradient}>
            <View style={styles.formWrapper}>
              <SignupStepper/>
            </View>
          </LinearGradient>
          <View style={styles.bottomTextContainer}>
            <View style={styles.bottomTextWrapper}>
              <Text style={styles.bottomText}>
                <Text style={styles.new}>{t('signUp.alreadyMember')}</Text>
                <Text onPress={handleLogin} style={styles.create}>{t('signUp.login')}</Text>
              </Text>
            </View>
          </View>

        </KeyboardAvoidingView>

      </SafeAreaView>
      <SafeAreaView style={styles.lowerUnsafeAreaView}/>
    </Fragment>
  )
};
const styles = StyleSheet.create({
  upperUnsafeAreaView: {
    flex: 0,
    backgroundColor: '#FDFDFD',
  },
  lowerUnsafeAreaView: {
    flex: 0,
    backgroundColor: '#FFAA55',
  },
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  titleLinearGradient: {
    flex: 146,
  },
  titleWrapper: {
    flex: 146,
    justifyContent: 'center',
  },
  topMargin: {
    flex: 60,
  },
  title: {
    flex: 45,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  epiprestoTitle: {
    fontSize: 48,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    // lineHeight: 48,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
  },
  languageSelector: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formWrapperGradient: {
    flex: 415,
  },
  formWrapper: {
    flex: 415,
  },
  inputs: {
    flex: 258,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    width: '100%',

  },

  nextButtonText: {
    fontFamily: "Lato",
    fontSize: 22,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 26,
    textAlign: "center",
    letterSpacing: -0.02,
    alignSelf: "center",
    color: "#000000"
  },
  loginButtonContainer: {
    flex: 106,
    justifyContent: 'center',
  },
  nextButton: {
    borderRadius: 12,
    backgroundColor: "#FDFDFD",
    alignSelf: "center",
    justifyContent: "center",
    width: '36%',
    height: '58%',
  },
  bottomLinearGradient: {
    flex: 50,
  },
  bottomTextContainer: {
    flex: 50,
    backgroundColor: '#FFAA55',
  },
  bottomTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomText: {
    borderRadius: 12,
  },
  new: {
    fontFamily: "Lato",
    fontSize: 15,
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: 26,
    textAlign: "center",
    color: "#000000"
  },
  create: {
    fontFamily: "Lato",
    fontSize: 15,
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: 26,
    textAlign: "center",
    color: "#000000"
  }


})

export default SignUp;
