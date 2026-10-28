# Makes the free printable "Calm Build Plan" that comes with the Calm Build Gift (16x16 kit).
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white

NAVY = HexColor("#1d2350"); PINK = HexColor("#d9677a"); CREAM = HexColor("#fbf4ec"); GREY = HexColor("#6b6f86")
BRICKS = ["#e94f4f", "#f2a93b", "#f4d35e", "#7bc67e", "#4aa3df", "#8e6cc7", "#f7f7f7", "#3a3a3a"]
W, H = letter
c = canvas.Canvas("calm-build-plan.pdf", pagesize=letter)
c.setTitle("Memobrick Calm Build Plan")

def page_bg(title, sub):
    c.setFillColor(CREAM); c.rect(0, 0, W, H, fill=1, stroke=0)
    for i, col in enumerate(BRICKS):  # brick strip
        c.setFillColor(HexColor(col)); c.rect(54 + i * 26, H - 60, 22, 22, fill=1, stroke=0)
    c.setFillColor(NAVY); c.setFont("Helvetica-Bold", 26); c.drawString(54, H - 105, title)
    c.setFillColor(GREY); c.setFont("Helvetica", 13); c.drawString(54, H - 127, sub)
    c.setFont("Helvetica", 9); c.drawString(54, 30, "mymemobrick.com  ·  Small bricks: keep away from children who put things in their mouths.")

def para(lines, x, y, size=13, lead=19, color=NAVY, bold_first=False):
    for i, ln in enumerate(lines):
        c.setFillColor(color); c.setFont("Helvetica-Bold" if (bold_first and i == 0) else "Helvetica", size)
        c.drawString(x, y, ln); y -= lead
    return y

# Page 1: how it works
page_bg("Your Calm Build Plan", "One photo. One brick size. One row at a time.")
y = H - 175
steps = [
    ("1. Set up a quiet spot", ["A table with good light. Open only the bag you need."]),
    ("2. Pick a session length", ["Try 15 or 20 minutes. Stopping is part of the plan."]),
    ("3. One color bag at a time", ["Each bag has a color name and number, like your map."]),
    ("4. One row at a time", ["Follow the map row by row. Tick the row on page 2."]),
    ("5. Stop at a STOP card", ["Use the cards on page 3. Leave the next bag ready."]),
    ("6. Look how far you came", ["Step back and see the picture appear."]),
]
for head, body in steps:
    c.setFillColor(PINK); c.roundRect(54, y - 8, 10, 10, 2, fill=1, stroke=0)
    y = para([head] + body, 74, y, bold_first=True) - 12
c.setFillColor(GREY); c.setFont("Helvetica-Oblique", 11)
c.drawString(54, y - 4, "Building together? Try three jobs: one reads the map, one finds the color, one presses the bricks.")
c.drawString(54, y - 20, "Swap jobs every few rows.")
c.showPage()

# Page 2: row tracker for a 16x16 (50 rows on one baseplate), in 10 blocks of 5
page_bg("Row Tracker", "Tick a box for every row you finish. 50 rows on a 16x16 board.")
x0, y0, box, gap = 54, H - 190, 34, 10
for r in range(10):
    yy = y0 - r * (box + 14)
    c.setFillColor(NAVY); c.setFont("Helvetica-Bold", 11); c.drawString(x0, yy + 11, f"Rows {r*5+1}-{r*5+5}")
    for k in range(5):
        xx = x0 + 110 + k * (box + gap)
        c.setStrokeColor(NAVY); c.setLineWidth(1.4); c.setFillColor(white)
        c.roundRect(xx, yy, box, box, 5, fill=1, stroke=1)
        c.setFillColor(GREY); c.setFont("Helvetica", 9); c.drawCentredString(xx + box / 2, yy + 3, str(r * 5 + k + 1))
    c.setFillColor(GREY); c.setFont("Helvetica", 10); c.drawString(x0 + 110 + 5 * (box + gap) + 8, yy + 11, "Date: __________")
c.showPage()

# Page 3: cut-out cards
page_bg("Cards to Cut Out", "Put one on the table so everyone knows what comes next.")
cards = [("NOW", "We are building", PINK), ("NEXT", "Next color bag: ______", NAVY),
         ("STOP HERE", "Great work. We continue later.", PINK), ("BREAK", "Stretch, drink water, come back", NAVY),
         ("DONE TODAY", "Rows today: ______", PINK), ("FINISHED!", "Step back and look", NAVY)]
cw, ch = 240, 150
for i, (big, small, col) in enumerate(cards):
    xx = 54 + (i % 2) * (cw + 30); yy = H - 330 - (i // 2) * (ch + 30)
    c.setDash(4, 3); c.setStrokeColor(GREY); c.roundRect(xx, yy, cw, ch, 10, fill=0, stroke=1); c.setDash()
    c.setFillColor(col); c.setFont("Helvetica-Bold", 30); c.drawCentredString(xx + cw / 2, yy + ch / 2 + 6, big)
    c.setFillColor(GREY); c.setFont("Helvetica", 12); c.drawCentredString(xx + cw / 2, yy + ch / 2 - 22, small)
c.showPage()
c.save()
