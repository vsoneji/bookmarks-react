import { IBookmarkData } from "./schema";

export const sampleData: IBookmarkData = {
    title: "Vipul's Homepage",
    columns: 5,
    panels: [
        {
            label: "Environments",
            ignored: true,
            bookmarks: [
                {
                    label: "Dev",
                    url: "https://devportal.prometheanproduct.com/"
                },
                {
                    label: "Sandbox",
                    url: "https://sandboxportal.prometheanproduct.com/"
                },
                {
                    label: "Staging",
                    url: "https://portal.staging.mypromethean.com/"
                },
                {
                    label: "Prod",
                    url: "https://portal.mypromethean.com/"
                },
            ]
        },
        {
            label: "News",
            bookmarks: [
              {
                url: "http://www.realclearpolitics.com/",
                label: "Real Clear Politics",
              },
              { url: "http://www.cnn.com/", label: "CNN" },
              { url: "http://www.foxnews.com/", label: "Fox News" },
              { url: "http://wsbradio.com", label: "WSB Radio" },
              { url: "http://www.drudgereport.com", label: "Drudge Report" },
              { url: "http://wsbtv.com", label: "WSB TV" },
              { url: "http://news.google.com/", label: "Google News" },
            ],
          },
          {
            label: "Lookup",
            bookmarks: [
              {
                url: "https://www.worldtimebuddy.com/?pl=1&amp;lid=1275339,4180439&amp;h=4180439",
                label: "Time - India",
              },
              { url: "http://www.wolframalpha.com/", label: "Worlfram Alpha" },
              { url: "http://postcalc.usps.gov/", label: "Calculate Postage" },
              {
                url: "http://www.packagetrackr.com/user/inbox",
                label: "Package Tracker",
              },
              { url: "http://www.scamcharge.com", label: "Credit Charge lookup" },
              { url: "http://www.oddstuffmagazine.com", label: "Odd Stuff Magazine" },
            ],
          },
          {
            label: "Finance",
            bookmarks: [
              { url: "http://www.discovercard.com", label: "Discover Card" },
              { url: "http://www.vanguard.com/", label: "Vanguard" },
              { url: "http://www.icicibank.com/", label: "ICICI Bank" },
              { url: "http://www.fidelity.com/", label: "Fidelity" },
              {
                url: "https://www.citi.com/credit-cards/creditcards/CitiHome.do",
                label: "Citibank",
              },
              { url: "http://www.wellsfargo.com", label: "Wells Fargo" },
              { url: "https://access1.sbc.com/", label: "AT&T HR OneStop" },
              { url: "https://www.schwab.com/", label: "Charles Schwab" },
            ],
          },
          {
            label: "Schools",
            bookmarks: [
              {
                url: "http://www.fultonscienceacademy.org",
                label: "Fulton Science Academy",
              },
              {
                url: "https://fsaconnect.fultonscienceacademy.org/login/index.php",
                label: "FSA Connect",
              },
              {
                url: "https://campus.fultonschools.org/campus/portal/fulton.jsp",
                label: "Fulton - Infinite Campus",
              },
            ],
          },
          {
            label: "Research",
            bookmarks: [
              { url: "http://www.fool.com/", label: "Motley Fool" },
              { url: "http://moneycentral.msn.com/", label: "MSN MoneyCentral" },
              { url: "http://www.cnn.com/money", label: "Money.com" },
              { url: "http://www.bankrate.com/", label: "Bank Rate" },
              { url: "http://www.smartmoney.com/", label: "Smart Money" },
              { url: "http://www.clarkhoward.com/", label: "ClarkHoward.com" },
              {
                url: "https://getsatisfaction.com/quickencommunity",
                label: "Quicken Community",
              },
            ],
          },
          {
            label: "Local Network",
            bookmarks: [
              { url: "http://192.168.15.1/", label: "Router" },
              { url: "http://XPS13:8384/", label: "SyncThing - xps13" },
              { url: "http://VSWIN10:8384/", label: "SyncThing - vsWin10" },
              { url: "http://192.168.15.242/", label: "Octo-Print" },
            ],
          },
          {
            label: "EMail",
            bookmarks: [
              { url: "http://www.outlook.com/", label: "Outlook" },
              { url: "http://my.yahoo.com/", label: "My Yahoo" },
              {
                url: "http://www.sonejifamily.com/webmail",
                label: "SonejiFamily Mail",
              },
              { url: "https://mail.google.com", label: "GMail" },
            ],
          },
          {
            label: "Stores",
            bookmarks: [
              { url: "http://smile.amazon.com/", label: "Amazon.com" },
              { url: "http://www.newegg.com", label: "NewEgg" },
              { url: "http://www.walmart.com/", label: "WalMart.com" },
              { url: "http://www.overstock.com/", label: "Overstock.com" },
              { url: "https://www.indiegogo.com", label: "Indiegogo" },
              { url: "http://www.kickstarter.com/", label: "KickStarter" },
            ],
          },
          {
            label: "Deals",
            bookmarks: [
              { url: "http://atlanta.craigslist.com", label: "Craigs List" },
              { url: "http://www.techbargains.com/", label: "Tech Bargains" },
              { url: "http://www.slickdeals.net/", label: "Slick Deals" },
              { url: "http://www.dealnews.net/", label: "Deal News" },
              { url: "http://www.ebay.com/", label: "E-Bay" },
            ],
          },
          {
            label: "Maps",
            bookmarks: [
              { url: "http://maps.google.com/", label: "Google Maps" },
              { url: "http://mappoint.msn.com/", label: "MSN Mappoint" },
              { url: "http://www.superpages.com/", label: "SuperPages" },
              { url: "http://local.live.com/", label: "Windows Live Maps" },
              { url: "http://www.mapquest.com/", label: "Mapquest" },
            ],
          },
          {
            label: "Service",
            bookmarks: [
              { url: "http://www.afplweb.com/", label: "Fulton Library" },
              { url: "https://www.evernote.com/Home.action", label: "Evernote" },
              { url: "http://www.opendns.com", label: "OpenDNS" },
              { url: "http://www.hostmonster.com", label: "Host Monster" },
            ],
          },
          {
            label: "Entertainment",
            bookmarks: [
              { url: "http://www.youtube.com", label: "YouTube" },
              { url: "http://www.netflix.com/", label: "Net Flix" },
              { url: "http://www.imdb.com/", label: "IMDB" },
              { url: "http://pandora.com/", label: "Pandora Radio" },
              { url: "http://www.lifehacker.com/", label: "LifeHacker" },
            ],
          },
          {
            label: "Google",
            bookmarks: [
              { url: "http://calendar.google.com/", label: "Calendar" },
              { url: "http://www.google.com/finance", label: "Finance" },
              { url: "http://contacts.google.com", label: "Contacts" },
              { url: "http://translate.google.com", label: "Translate" },
              { url: "https://messages.google.com/web", label: "Messages" },
            ],
          },
          {
            label: "Cameras",
            ignored: true,
            bookmarks: [
              { url: "http://vsoneji.ddns.net:91/", label: "Camera1" },
              { url: "http://vsoneji.ddns.net:93/", label: "Camera3" },
              { url: "http://vsoneji.ddns.net:94/", label: "Camera4" },
            ],
          },
          {
            label: "Development",
            bookmarks: [
              { url: "http://VSWIN10:3000/", label: "Git Gogs - vsWin10" },
              { url: "http://vswin10:9000", label: "Portainer - vsWin10" },
              { url: "http://www.github.com", label: "Github" },
              { url: "http://vswin10:8080", label: "Jenkins - vsWin10" },
            ],
          }      
    ]
}