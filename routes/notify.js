const express = require('express');
const { EmbedBuilder } = require('discord.js');
const { SECRETS } = require('../config');

const NOTIFY_ROUTER = express.Router();

const trimString = (str, max) =>
  str?.length > max ? `${str?.slice(0, max - 3)}...` : str;

NOTIFY_ROUTER.post('/offer', async (req, res) => {
  let { offerName, offerDetails, targetPrice, commission, discordHandle } =
    req.body;
  let body = req.body;
  console.log({body});
  try {
    const embed = new EmbedBuilder()
      .setColor('#D8315B')
      .setTitle(offerName)
      .addFields(
        {
          name: 'Offer Details',
          value: trimString(offerDetails, 1024)
        },
        {
          name: 'Target Price',
          value: targetPrice
        },
        {
          name: 'Commission Percentage',
          value: commission
        },
        { name: 'Discord Handle', value: discordHandle }
      )
      .setTimestamp();

    req.CLIENT.guilds.cache
      .get(SECRETS.GUILD_ID)
      .channels.cache.get(SECRETS.OFFERS_SUBMISSION_CHANNEL_ID)
      .send({ embeds: [embed] });

    res.json({ err: null, message: 'message posted.' });
  } catch (err) {
    console.log(err);
    res.json({ err: 'error posting message.', message: null });
  }
});

NOTIFY_ROUTER.post('/membership', async (req, res) => {
  let {
    discordHandle,
    twitterHandle,
    telegramHandle,
    timezone,
    yearsInSales,
    joinReason,
    sellInterest
  } = req.body;
  try {
    const embed = new EmbedBuilder()
      .setColor('#D8315B')
      .setTitle('New Membership Request')
      .addFields(
        {
          name: 'Reason to Join',
          value: trimString(joinReason, 1024)
        },
        {
          name: 'Selling Interests',
          value: trimString(sellInterest, 1024)
        },
        {
          name: 'Years in Sales Exp',
          value: yearsInSales
        },
        { name: 'Timezone', value: timezone },
        { name: 'Discord Handle', value: discordHandle },
        { name: 'Twitter Hanlde', value: twitterHandle },
        { name: 'Telegram Handle', value: telegramHandle }
      )
      .setTimestamp();

    req.CLIENT.guilds.cache
      .get(SECRETS.GUILD_ID)
      .channels.cache.get(SECRETS.MEMBERSHIP_SUBMISSIONS_CHANNEL_ID)
      .send({ embeds: [embed] });
    res.json({ err: null, message: 'message posted.' });
  } catch (err) {
    console.log(err);
    res.json({ err: 'error posting message.', message: null });
  }
});

module.exports = NOTIFY_ROUTER;
