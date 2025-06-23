import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import * as Icons from 'phosphor-react-native';
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import Typo from "../components/Typo";

const Profile = () => {
  const router = useRouter();

  const accountOptions = [
    {
      title: "Edit Profile",
      icon: (
        <Icons.User size={26} color={colors.white} weight="fill" />
      ),
      // routeName: '/(modals)/profileModal',
      bgColor: "#6366f1",
    },
    {
      title: "Settings",
      icon: (
        <Icons.GearSix size={verticalScale(26)} color={colors.white} weight="fill" />
      ),
      // routeName: '/(modals)/settingsModal',
      bgColor: "#059669",
    },
    {
      title: "Privacy Policy",
      icon: (
        <Icons.Lock size={verticalScale(26)} color={colors.white} weight="fill" />
      ),
      // routeName: "/(modals)/privacyPolicyModal",
      bgColor: "#e11648",
    },
    {
      title: "Logout",
      icon: (
        <Icons.Power size={verticalScale(26)} color={colors.white} weight="fill" />
      ),
      // routeName: "/(modals)/categories",
      bgColor: "#e11d48",
    },
  ]

  const handleLogout = async () => {
    Alert.alert("Logout")
  };

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel delete"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => handleLogout(),
        style: "destructive",
      },
    ]);
  };

  const handlePress = async (item: any) => {
    if (item?.title === "Logout") {
      showLogoutAlert();
    }
    
    if (item?.routeName) router.push(item?.routeName);
  };

  return (
    <View className='bg-primary flex-1 p-10'>
      <Header title="Profile" style={{marginVertical: spacingY._10}} />
      <View style={styles.userInfo}>
        <View>
          <Image source={require("../../assets/images/defaultAvatar.png")} style={styles.avatar} contentFit="cover" />
        </View>
        <View style={styles.nameContainer}>
          <Typo size={24} fontWeight={"600"}>
            {"John"}
          </Typo>
          <Typo size={15} color={colors.neutral400}>
            {"j20@gmail.com"}
          </Typo>
        </View>
        {/* account options */}
        <View style={styles.accountOptions}>
          { accountOptions.map((item, index) => {
              return (
                  <TouchableOpacity key={index} style={[styles.flexRow, styles.listItem]} onPress={() => handlePress(item)}>
                    {/* Icon */}
                    <View style={[styles.listIcon, { backgroundColor: item?.bgColor }]}>
                      {item.icon && item.icon}
                    </View>
                    <Typo size={16} style={{width:"65%", alignItems:"center"}} fontWeight={"500"}>{item.title}</Typo>
                    <Icons.CaretRight size={24} color={colors.white} weight="bold" />
                  </TouchableOpacity>
              )})
          } 
        </View>
      </View>
    </View>
  )
}

export default Profile


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    // overflow: "hidden",
    // position: "relative",
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 5,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});