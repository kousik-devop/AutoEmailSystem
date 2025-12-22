import html

def generate_subject(email_text: str) -> str:
    first_line = email_text.strip().split("\n")[0]
    cleaned = first_line.replace("Subject:", "").strip()
    return cleaned[:78] or "Important Update"


def generate_html(email_text: str, brand: dict | None = None) -> str:
    brand = brand or {}

    company = brand.get("company_name", "Your Company")
    website = brand.get("website", "#")
    sender = brand.get("sender_name", company)
    cta_text = brand.get("cta_text", "Get Started Today")
    primary = brand.get("primary_color", "#6D5DFB")
    logo_url = brand.get(
        "logo_url",
        "https://dummyimage.com/120x40/ffffff/000000&text=LOGO"
    )

    paragraphs = email_text.split("\n\n")

    body_html = "".join(
        f"""
        <tr>
          <td style="padding:8px 0;font-size:15px;line-height:1.7;color:#333">
            {html.escape(p)}
          </td>
        </tr>
        """
        for p in paragraphs
    )

    return f"""
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:24px">

<!-- Card -->
<table width="600" cellpadding="0" cellspacing="0"
 style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08)">

<!-- Header -->
<tr>
<td style="background:linear-gradient(135deg,{primary},#8b7cfb);padding:28px;text-align:center;color:#fff">
  <img src="{logo_url}" alt="{company}" style="max-width:120px;margin-bottom:10px"/>
  <h1 style="margin:0;font-size:22px;font-weight:600">{company}</h1>
  <p style="margin:6px 0 0;font-size:13px;opacity:0.9">{website}</p>
</td>
</tr>

<!-- Content -->
<tr>
<td style="padding:32px">
<table width="100%">
{body_html}
</table>

<!-- Highlight Box -->
<table width="100%" style="margin-top:18px;background:#f1f3ff;border-left:4px solid {primary}">
<tr>
<td style="padding:14px;font-size:14px;color:#333">
<strong>{company}</strong> programs are designed by industry experts and focus on
<strong>hands-on, real-world skills</strong> to help you get job-ready faster.
</td>
</tr>
</table>

</td>
</tr>

<!-- CTA -->
<tr>
<td align="center" style="padding-bottom:28px">
<a href="{website}"
 style="background:{primary};color:#fff;text-decoration:none;
 padding:14px 26px;border-radius:30px;font-size:15px;
 display:inline-block;font-weight:600">
 {cta_text}
</a>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#f9fafb;padding:18px;text-align:center;font-size:12px;color:#777">
<p style="margin:4px 0">Best regards,<br/>
<strong>{sender}</strong></p>

<p style="margin:6px 0">
<a href="{website}" style="color:{primary};text-decoration:none">{website}</a>
</p>

<p style="margin:0">© {company}. All rights reserved.</p>
</td>
</tr>

</table>
<!-- End Card -->

</td>
</tr>
</table>
</body>
</html>
"""
