export default async function handler(req, res) {
  const c = (req.query.c || "S").toUpperCase();

  const allowed = ["F", "B", "L", "R", "S", "P"];
  if (!allowed.includes(c)) {
    return res.status(400).send("Invalid command");
  }

  const TALKBACK_ID = process.env.TALKBACK_ID;
  const TALKBACK_KEY = process.env.TALKBACK_KEY;

  if (!TALKBACK_ID || !TALKBACK_KEY) {
    return res.status(500).send("Missing TalkBack keys");
  }

  const url = `https://api.thingspeak.com/talkbacks/${TALKBACK_ID}/commands`;

  const body = new URLSearchParams();
  body.append("api_key", TALKBACK_KEY);
  body.append("command_string", c);

  await fetch(url, { method: "POST", body });

  return res.status(200).send("OK");
}
