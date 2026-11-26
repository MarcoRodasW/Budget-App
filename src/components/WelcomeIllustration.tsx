import { StyleSheet, Text, View } from 'react-native';
import { colors, elevation, fonts } from '../theme';

// Card + wallet + coins composition built from plain Views, using the DESIGN.md palette
export default function WelcomeIllustration() {
  return (
    <View style={styles.stage} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View style={styles.backdrop} />

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tarjeta</Text>
        <Text style={styles.cardNumber}>•••• •••• 4291</Text>
        <View style={styles.cardStripe} />
      </View>

      {/* Wallet */}
      <View style={styles.wallet}>
        <View style={styles.walletStitch} />
      </View>
      <View style={styles.flap}>
        <View style={styles.clasp}>
          <View style={styles.claspInner} />
        </View>
      </View>

      {/* Coins */}
      <Coin size={58} style={styles.coinBig} />
      <Coin size={46} style={styles.coinSmall} />
    </View>
  );
}

function Coin({ size, style }: { size: number; style: object }) {
  return (
    <View style={[styles.coin, { width: size, height: size, borderRadius: size / 2 }, style]}>
      <View style={[styles.coinInner, { width: size - 14, height: size - 14, borderRadius: (size - 14) / 2 }]}>
        <Text style={[styles.coinSymbol, { fontSize: size * 0.42, lineHeight: size * 0.5 }]}>$</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    width: 280,
    height: 260,
    alignSelf: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 10,
    left: 20,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.muted,
  },
  card: {
    position: 'absolute',
    top: 38,
    left: 92,
    width: 160,
    height: 104,
    borderRadius: 20,
    backgroundColor: colors.sageLight,
    padding: 16,
    transform: [{ rotate: '-12deg' }],
    ...elevation.level1,
  },
  cardTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 18,
    color: colors.ink,
  },
  cardNumber: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 0.5,
    color: colors.ink,
    opacity: 0.7,
    marginTop: 4,
  },
  cardStripe: {
    marginTop: 12,
    width: 52,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surface,
    opacity: 0.7,
  },
  wallet: {
    position: 'absolute',
    top: 100,
    left: 44,
    width: 170,
    height: 132,
    borderRadius: 30,
    backgroundColor: colors.coralLight,
    padding: 10,
    ...elevation.level2,
  },
  walletStitch: {
    flex: 1,
    borderRadius: 22,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  flap: {
    position: 'absolute',
    top: 132,
    left: 128,
    width: 96,
    height: 64,
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: colors.coral,
    justifyContent: 'center',
    paddingLeft: 14,
  },
  clasp: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  claspInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: colors.muted,
  },
  coin: {
    position: 'absolute',
    backgroundColor: colors.mustard,
    alignItems: 'center',
    justifyContent: 'center',
    ...elevation.level1,
  },
  coinInner: {
    borderWidth: 2,
    borderColor: colors.mustardSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinSymbol: {
    fontFamily: fonts.extrabold,
    color: colors.primary,
  },
  coinBig: {
    top: 180,
    left: 196,
  },
  coinSmall: {
    top: 150,
    left: 226,
  },
});
