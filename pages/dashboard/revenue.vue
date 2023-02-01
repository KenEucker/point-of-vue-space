<template>
  <div>
    <ModalTransfer
      v-if="enrolled"
      ref="modal_transfer"
      :wallet="$auth.user.payout_data.payout_wallet"
      :account-type="$auth.user.payout_data.payout_wallet_type"
      :account="$auth.user.payout_data.payout_address"
      :balance="$auth.user.payout_data.balance"
      :min-withdraw="minWithdraw"
    />
    <section class="universal-card">
      <h2>Withdraw</h2>
      <div v-if="$auth.user.payout_data.balance >= minWithdraw">
        <p>
          You have
          <strong>{{ $formatMoney($auth.user.payout_data.balance) }}</strong>
          available to withdraw.
          <span v-if="!enrolled"
            >Enroll in the Creator Monetization Program to withdraw your
            revenue.</span
          >
        </p>

        <div v-if="enrolled" class="input-group">
          <button
            class="iconified-button brand-button"
            @click="$refs.modal_transfer.show()"
          >
            <TransferIcon /> Transfer to
            {{ $formatWallet($auth.user.payout_data.payout_wallet) }}
          </button>
          <NuxtLink class="iconified-button" to="/settings/monetization">
            <SettingsIcon /> Monetization settings
          </NuxtLink>
        </div>
      </div>
      <p v-else-if="$auth.user.payout_data.balance > 0">
        You have made
        <strong>{{ $formatMoney($auth.user.payout_data.balance) }}</strong
        >, however you have not yet met the minimum of ${{ minWithdraw }} to
        withdraw.
      </p>
      <p v-else>
        You have made
        <strong>{{ $formatMoney($auth.user.payout_data.balance) }}</strong
        >, which is under the minimum of ${{ minWithdraw }} to withdraw.
      </p>
      <div v-if="!enrolled">
        <NuxtLink class="iconified-button" to="/settings/monetization">
          <SettingsIcon /> Enroll in the Creator Monetization Program
        </NuxtLink>
      </div>
    </section>
    <section class="universal-card">
      <h2>Processing fees</h2>
      <p>{{ iDb.revenue.processingFees }}{{ minWithdraw }}.</p>
      <h3>PayPal</h3>
      <ul>
        <li>
          In the <strong>United States</strong>, PayPal charges a flat
          <strong>$0.25</strong>
          fee per transaction.
        </li>
        <li>
          In the rest of the world, PayPal charges a <strong>2%</strong> (up to
          $20) fee per transaction.
        </li>
      </ul>
      <p>
        {{ iDb.revenue.deduction1
        }}<strong>{{ iDb.revenue.deductionAmount }}</strong
        >{{ iDb.revenue.deduction2 }}
        <strong> {{ iDb.revenue.deduction2Strong }}</strong
        >{{ iDb.revenue.deduction3 }}
      </p>
      <h3>Venmo (United States only)</h3>
      <p>
        Venmo will charge a $0.25 processing fee per transaction, which will be
        deducted from the amount you choose to transfer.
      </p>
      <h2>Currency conversions</h2>
      <p>
        {{ iDb.revenue.currencyConversion }}
      </p>
    </section>
  </div>
</template>

<script>
import TransferIcon from '~/assets/images/utils/transfer.svg?inline'
import SettingsIcon from '~/assets/images/utils/settings.svg?inline'
import ModalTransfer from '~/components/ui/ModalTransfer'

import iDb from '~/iDb/pages/dashboard'

export default {
  components: { TransferIcon, SettingsIcon, ModalTransfer },
  data() {
    return {
      iDb,

      minWithdraw: 0.26,
      enrolled:
        this.$auth.user.payout_data.payout_wallet &&
        this.$auth.user.payout_data.payout_wallet_type &&
        this.$auth.user.payout_data.payout_address,
    }
  },
  head: {
    title: 'Revenue - ' + iDb.appName,
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
strong {
  color: var(--color-text-dark);
  font-weight: 500;
}
</style>
