
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import ProduitService from '../../services/produit.service'
import Constants from 'expo-constants';
import { Radio } from 'native-base'
import axios from 'axios'
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import authService from '../../services/auth.service'
import CommandeService from '../../services/commande.service';
import { Card, CardItem } from 'native-base';
export default function DetailsScreen({ navigation, route }) {



  let { article_id } = route.params;
  const [produit, setProduit] = useState([])

  const retrieveProduit = () => {
    ProduitService.getProduitWithArticleId(article_id)
      .then((response) => {
        setProduit(response.data[0])
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [similarItems, setSimilarItems] = useState([]);

  const getSimilarItems = async () => {
    let item_id = article_id;
    try {
      const response = await axios.get(`http://192.168.1.3:5000/get_similar_items/${item_id}`);
      setSimilarItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [similarProducts, setSimilarProducts] = useState([]);
  const retrieveSimilarProducts = async () => {
    try {
      const response = await ProduitService.getProduitWithArticleIds(similarItems);
      setSimilarProducts(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [tailles, setTailles] = useState([])

  const retrieveTailles = () => {
    let produitId = produit.id
    ProduitService.getTailleOfProduit(produitId)
      .then((response) => {
        setTailles(response.data)
      })
      .catch((e) => {
        console.log(e);

      });
  };

  const [user, setUser] = useState()
  const retrieveUser = () => {
    authService
      .GetCurrentUser()
      .then((data) => {
        setUser(JSON.parse(data))
        console.log('CurrentUserId :', user?.user?.id)
      })
      .catch((e) => {
        console.log(e)
      })
  }


  let produitId; // Ensure produitId is defined outside the function scope

  // Assign a value to produitId
  produitId = produit.id;
  const retrieveCouleurs = () => {
    ProduitService.getCouleurOfPRoduit(produitId)
      .then((response) => {
        setCouleurs(response.data)
      })
      .catch((e) => {
        console.log(e);

      });
  };





  // const [avis, setAvis] = useState([])

  // const retriveAvisOfProduit = () => {
  //   console.log(produitId)
  //   ProduitService.getAvisOfProduit(produitId)
  //     .then((response) => {
  //       setAvis(response.data)
  //     })
  //     .catch((e) => {
  //       console.log(e);

  //     });
  // };
  // console.log(avis)
  // const Card = ({ avis }) => {
  //   {
  //     avis.map((avi) => (
  //       <Card key={avi.id} style={{ marginTop: 10 }}>
  //         <CardItem header bordered style={styles.cardHeader}>
  //           <Text style={styles.subheading}>{avi.id}</Text>
  //         </CardItem>
  //         <CardItem>
  //           <View>
  //             <Text>
  //               {avi.desc}
  //             </Text>
  //           </View>
  //         </CardItem>
  //       </Card>
  //     ))
  //   }
  // }



  useEffect(() => {
    retrieveUser()

  }, []);

  useEffect(() => {
    retrieveProduit()
    getSimilarItems()
    // retriveAvisOfProduit()
  }, [article_id]);


  useEffect(() => {
    retrieveTailles()
    retrieveCouleurs()

  }, [produitId]);

  useEffect(() => {
    retrieveSimilarProducts()
  }, [similarItems]);



  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
  }, []);

  const [qty, setQte] = useState(1)
  const increaseQte = () => {
    setQte(qty + 1)
  }
  const descreaseQte = () => {
    qty == 1 ? qty : setQte(qty - 1)

  }
  const [couleurs, setCouleurs] = useState([])
  const [selectedOptionCouleur, setSelectedOptionCouleur] = useState(null);

  const handleSelectCouleur = (couleur) => {
    setSelectedOptionCouleur(couleur.id);
  };

  const RadioButtonGroupCouleurs = ({ couleurs, selectedOption, onSelect }) => {
    return (
      <View>
        {couleurs.map((couleur) => (
          <TouchableOpacity
            key={couleur.id}
            onPress={() => onSelect(couleur)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: couleur.id === selectedOption ? 'black' : 'gray',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {couleur.id === selectedOption && (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: 'black',
                  }}
                />
              )}
            </View>
            <Text style={{ marginLeft: 8 }}>{couleur.nomC}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (taille) => {
    setSelectedOption(taille.id);
  };
  const RadioButtonGroupTailles = ({ tailles, selectedOption, onSelect }) => {
    return (
      <View>
        {tailles.map((taille) => (
          <TouchableOpacity
            key={taille.id}
            onPress={() => onSelect(taille)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: taille.id === selectedOption ? 'black' : 'gray',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {taille.id === selectedOption && (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: 'black',
                  }}
                />
              )}
            </View>
            <Text style={{ marginLeft: 8 }}>{taille.nomT}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const addCommande = () => {
    const tailleId = selectedOption
    const couleurId = selectedOptionCouleur
    const clientId = user?.user?.id
    CommandeService.AddCommande(tailleId, couleurId, qty, clientId, produitId)
      .then((response) => {
        navigation.navigate("MyCart", {
          clientId: clientId,
        });
      })
      .catch((error) => {
        console.log(error)
      })
  }



  const IMAGE_MAPPING = {
    "108775015": require("./images/0108775015.jpg"),
    "108775044": require("./images/0108775044.jpg"),
    "108775051": require("./images/0108775051.jpg"),
    "110065001": require("./images/0110065001.jpg"),
    "110065002": require("./images/0110065002.jpg"),
    "110065011": require("./images/0110065011.jpg"),
    "111565001": require("./images/0111565001.jpg"),
    "111565003": require("./images/0111565003.jpg"),
    "111586001": require("./images/0111586001.jpg"),
    "111593001": require("./images/0111593001.jpg"),
    "111609001": require("./images/0111609001.jpg"),
    "112679048": require("./images/0112679048.jpg"),
    "112679052": require("./images/0112679052.jpg"),
    "114428026": require("./images/0114428026.jpg"),
    "114428030": require("./images/0114428030.jpg"),
    "116379047": require("./images/0116379047.jpg"),
    "118458003": require("./images/0118458003.jpg"),
    "118458004": require("./images/0118458004.jpg"),
    "118458028": require("./images/0118458028.jpg"),
    "118458029": require("./images/0118458029.jpg"),
    "118458034": require("./images/0118458034.jpg"),
    "118458038": require("./images/0118458038.jpg"),
    "118458039": require("./images/0118458039.jpg"),
    "120129001": require("./images/0120129001.jpg"),
    "120129014": require("./images/0120129014.jpg"),
    "120129018": require("./images/0120129018.jpg"),
    "120129025": require("./images/0120129025.jpg"),
    "123173001": require("./images/0123173001.jpg"),
    "126589006": require("./images/0126589006.jpg"),
    "126589007": require("./images/0126589007.jpg"),
    "126589010": require("./images/0126589010.jpg"),
    "126589011": require("./images/0126589011.jpg"),
    "126589012": require("./images/0126589012.jpg"),
    "129085001": require("./images/0129085001.jpg"),
    "129085026": require("./images/0129085026.jpg"),
    "129085027": require("./images/0129085027.jpg"),
    "130035001": require("./images/0130035001.jpg"),
    "141661022": require("./images/0141661022.jpg"),
    "141661025": require("./images/0141661025.jpg"),
    "144993001": require("./images/0144993001.jpg"),
    "145872001": require("./images/0145872001.jpg"),
    "145872037": require("./images/0145872037.jpg"),
    "145872043": require("./images/0145872043.jpg"),
    "145872051": require("./images/0145872051.jpg"),
    "145872052": require("./images/0145872052.jpg"),
    "145872053": require("./images/0145872053.jpg"),
    "146706001": require("./images/0146706001.jpg"),
    "146706004": require("./images/0146706004.jpg"),
    "146706005": require("./images/0146706005.jpg"),
    "146721001": require("./images/0146721001.jpg"),
    "146721002": require("./images/0146721002.jpg"),
    "146730001": require("./images/0146730001.jpg"),
    "147339034": require("./images/0147339034.jpg"),
    "148033001": require("./images/0148033001.jpg"),
    "148033006": require("./images/0148033006.jpg"),
    "150959011": require("./images/0150959011.jpg"),
    "150959013": require("./images/0150959013.jpg"),
    "153115019": require("./images/0153115019.jpg"),
    "153115020": require("./images/0153115020.jpg"),
    "153115021": require("./images/0153115021.jpg"),
    "153115039": require("./images/0153115039.jpg"),
    "153115040": require("./images/0153115040.jpg"),
    "153115043": require("./images/0153115043.jpg"),
    "156224001": require("./images/0156224001.jpg"),
    "156224002": require("./images/0156224002.jpg"),
    "156227001": require("./images/0156227001.jpg"),
    "156227002": require("./images/0156227002.jpg"),
    "156231001": require("./images/0156231001.jpg"),
    "156231002": require("./images/0156231002.jpg"),
    "156289011": require("./images/0156289011.jpg"),
    "156610001": require("./images/0156610001.jpg"),
    "156610007": require("./images/0156610007.jpg"),
    "156610010": require("./images/0156610010.jpg"),
    "158340001": require("./images/0158340001.jpg"),
    "160442007": require("./images/0160442007.jpg"),
    "160442010": require("./images/0160442010.jpg"),
    "160442042": require("./images/0160442042.jpg"),
    "160442043": require("./images/0160442043.jpg"),
    "162074062": require("./images/0162074062.jpg"),
    "162074069": require("./images/0162074069.jpg"),
    "162074071": require("./images/0162074071.jpg"),
    "163734002": require("./images/0163734002.jpg"),
    "163734054": require("./images/0163734054.jpg"),
    "164912035": require("./images/0164912035.jpg"),
    "164912039": require("./images/0164912039.jpg"),
    "174057022": require("./images/0174057022.jpg"),
    "174057026": require("./images/0174057026.jpg"),
    "174057027": require("./images/0174057027.jpg"),
    "174057029": require("./images/0174057029.jpg"),
    "174057030": require("./images/0174057030.jpg"),
    "174057032": require("./images/0174057032.jpg"),
    "174057033": require("./images/0174057033.jpg"),
    "174057035": require("./images/0174057035.jpg"),
    "174057036": require("./images/0174057036.jpg"),
    "174057037": require("./images/0174057037.jpg"),
    "174057038": require("./images/0174057038.jpg"),
    "174057039": require("./images/0174057039.jpg"),
    "174057040": require("./images/0174057040.jpg"),
    "176209023": require("./images/0176209023.jpg"),
    "176209025": require("./images/0176209025.jpg"),
    "176209033": require("./images/0176209033.jpg"),
    "176209035": require("./images/0176209035.jpg"),
    "176209039": require("./images/0176209039.jpg"),
    "176209040": require("./images/0176209040.jpg"),
    "176209044": require("./images/0176209044.jpg"),
    "176209046": require("./images/0176209046.jpg"),
    "176550016": require("./images/0176550016.jpg"),
    "176550017": require("./images/0176550017.jpg"),
    "176550018": require("./images/0176550018.jpg"),
    "176550020": require("./images/0176550020.jpg"),
    "176550021": require("./images/0176550021.jpg"),
    "176754001": require("./images/0176754001.jpg"),
    "176754003": require("./images/0176754003.jpg"),
    "176754019": require("./images/0176754019.jpg"),
    "179123001": require("./images/0179123001.jpg"),
    "179123040": require("./images/0179123040.jpg"),
    "179208008": require("./images/0179208008.jpg"),
    "179393001": require("./images/0179393001.jpg"),
    "179393018": require("./images/0179393018.jpg"),
    "179950001": require("./images/0179950001.jpg"),
    "179950002": require("./images/0179950002.jpg"),
    "179950017": require("./images/0179950017.jpg"),
    "181160009": require("./images/0181160009.jpg"),
    "181448022": require("./images/0181448022.jpg"),
    "181448102": require("./images/0181448102.jpg"),
    "181448103": require("./images/0181448103.jpg"),
    "181448104": require("./images/0181448104.jpg"),
    "181448105": require("./images/0181448105.jpg"),
    "181448106": require("./images/0181448106.jpg"),
    "181448109": require("./images/0181448109.jpg"),
    "182909001": require("./images/0182909001.jpg"),
    "183815013": require("./images/0183815013.jpg"),
    "184121021": require("./images/0184121021.jpg"),
    "184123020": require("./images/0184123020.jpg"),
    "184583014": require("./images/0184583014.jpg"),
    "186262001": require("./images/0186262001.jpg"),
    "186262006": require("./images/0186262006.jpg"),
    "186262007": require("./images/0186262007.jpg"),
    "186262013": require("./images/0186262013.jpg"),
    "186264014": require("./images/0186264014.jpg"),
    "186264015": require("./images/0186264015.jpg"),
    "186264016": require("./images/0186264016.jpg"),
    "186266004": require("./images/0186266004.jpg"),
    "186267001": require("./images/0186267001.jpg"),
    "186372011": require("./images/0186372011.jpg"),
    "186372042": require("./images/0186372042.jpg"),
    "186372045": require("./images/0186372045.jpg"),
    "186595001": require("./images/0186595001.jpg"),
    "187949016": require("./images/0187949016.jpg"),
    "187949019": require("./images/0187949019.jpg"),
    "187949020": require("./images/0187949020.jpg"),
    "187949025": require("./images/0187949025.jpg"),
    "187949026": require("./images/0187949026.jpg"),
    "187949028": require("./images/0187949028.jpg"),
    "187949029": require("./images/0187949029.jpg"),
    "187949030": require("./images/0187949030.jpg"),
    "187949031": require("./images/0187949031.jpg"),
    "187949032": require("./images/0187949032.jpg"),
    "188183001": require("./images/0188183001.jpg"),
    "188183008": require("./images/0188183008.jpg"),
    "188183009": require("./images/0188183009.jpg"),
    "188183010": require("./images/0188183010.jpg"),
    "188183012": require("./images/0188183012.jpg"),
    "188183014": require("./images/0188183014.jpg"),
    "188183015": require("./images/0188183015.jpg"),
    "188183016": require("./images/0188183016.jpg"),
    "188183018": require("./images/0188183018.jpg"),
    "188183020": require("./images/0188183020.jpg"),
    "188183021": require("./images/0188183021.jpg"),
    "188183022": require("./images/0188183022.jpg"),
    "188183023": require("./images/0188183023.jpg"),
    "189383001": require("./images/0189383001.jpg"),
    "189383014": require("./images/0189383014.jpg"),
    "189616001": require("./images/0189616001.jpg"),
    "189616006": require("./images/0189616006.jpg"),
    "189616007": require("./images/0189616007.jpg"),
    "189616008": require("./images/0189616008.jpg"),
    "189616009": require("./images/0189616009.jpg"),
    "189616014": require("./images/0189616014.jpg"),
    "189616015": require("./images/0189616015.jpg"),
    "189616016": require("./images/0189616016.jpg"),
    "189616028": require("./images/0189616028.jpg"),
    "189616032": require("./images/0189616032.jpg"),
    "189616038": require("./images/0189616038.jpg"),
    "189626001": require("./images/0189626001.jpg"),
    "189634001": require("./images/0189634001.jpg"),
    "189634031": require("./images/0189634031.jpg"),
    "189654001": require("./images/0189654001.jpg"),
    "189654045": require("./images/0189654045.jpg"),
    "189654046": require("./images/0189654046.jpg"),
    "189654047": require("./images/0189654047.jpg"),
    "189691033": require("./images/0189691033.jpg"),
    "189691044": require("./images/0189691044.jpg"),
    "189691051": require("./images/0189691051.jpg"),
    "189691063": require("./images/0189691063.jpg"),
    "189691067": require("./images/0189691067.jpg"),
    "189691075": require("./images/0189691075.jpg"),
    "189955076": require("./images/0189955076.jpg"),
    "190021001": require("./images/0190021001.jpg"),
    "190021003": require("./images/0190021003.jpg"),
    "190021021": require("./images/0190021021.jpg"),
    "190252020": require("./images/0190252020.jpg"),
    "192460006": require("./images/0192460006.jpg"),
    "192960023": require("./images/0192960023.jpg"),
    "194037001": require("./images/0194037001.jpg"),
    "194037002": require("./images/0194037002.jpg"),
    "194242047": require("./images/0194242047.jpg"),
    "194242048": require("./images/0194242048.jpg"),
    "194242049": require("./images/0194242049.jpg"),
    "194242050": require("./images/0194242050.jpg"),
    "194270002": require("./images/0194270002.jpg"),
    "194270044": require("./images/0194270044.jpg"),
    "194270045": require("./images/0194270045.jpg"),
    "194270046": require("./images/0194270046.jpg"),
    "194902033": require("./images/0194902033.jpg"),
    "198518010": require("./images/0198518010.jpg"),
    "198518017": require("./images/0198518017.jpg"),
    "198518020": require("./images/0198518020.jpg"),
    "198518023": require("./images/0198518023.jpg"),
    "198518031": require("./images/0198518031.jpg"),
    "198714001": require("./images/0198714001.jpg"),
    "198714006": require("./images/0198714006.jpg"),
    "199119038": require("./images/0199119038.jpg"),
    "200182001": require("./images/0200182001.jpg"),
    "200182002": require("./images/0200182002.jpg"),
    "200761022": require("./images/0200761022.jpg"),
    "200761028": require("./images/0200761028.jpg"),
    "200761029": require("./images/0200761029.jpg"),
    "201219001": require("./images/0201219001.jpg"),
    "201219003": require("./images/0201219003.jpg"),
    "201219011": require("./images/0201219011.jpg"),
    "201219012": require("./images/0201219012.jpg"),
    "201219013": require("./images/0201219013.jpg"),
    "201219014": require("./images/0201219014.jpg"),
    "201219016": require("./images/0201219016.jpg"),
    "201219017": require("./images/0201219017.jpg"),
    "202017055": require("./images/0202017055.jpg"),
    "203027045": require("./images/0203027045.jpg"),
    "203027047": require("./images/0203027047.jpg"),
    "203027048": require("./images/0203027048.jpg"),
    "203595034": require("./images/0203595034.jpg"),
    "203595036": require("./images/0203595036.jpg"),
    "203595040": require("./images/0203595040.jpg"),
    "203595048": require("./images/0203595048.jpg"),
    "203595058": require("./images/0203595058.jpg"),
    "204892024": require("./images/0204892024.jpg"),
    "204892029": require("./images/0204892029.jpg"),
    "204892032": require("./images/0204892032.jpg"),
    "205225001": require("./images/0205225001.jpg"),
    "211143021": require("./images/0211143021.jpg"),
    "211143022": require("./images/0211143022.jpg"),
    "211143023": require("./images/0211143023.jpg"),
    "211143036": require("./images/0211143036.jpg"),
    "211143037": require("./images/0211143037.jpg"),
    "211143040": require("./images/0211143040.jpg"),
    "212042036": require("./images/0212042036.jpg"),
    "212042070": require("./images/0212042070.jpg"),
    "212629031": require("./images/0212629031.jpg"),
    "212629032": require("./images/0212629032.jpg"),
    "212629033": require("./images/0212629033.jpg"),
    "212629035": require("./images/0212629035.jpg"),
    "212629036": require("./images/0212629036.jpg"),
    "212629040": require("./images/0212629040.jpg"),
    "212629043": require("./images/0212629043.jpg"),
    "212629047": require("./images/0212629047.jpg"),
    "212629048": require("./images/0212629048.jpg"),
    "212629049": require("./images/0212629049.jpg"),
    "212629050": require("./images/0212629050.jpg"),
    "212629051": require("./images/0212629051.jpg"),
    "212766041": require("./images/0212766041.jpg"),
    "212766042": require("./images/0212766042.jpg"),
    "212766043": require("./images/0212766043.jpg"),
    "212766045": require("./images/0212766045.jpg"),
    "212766046": require("./images/0212766046.jpg"),
    "213690001": require("./images/0213690001.jpg"),
    "213691001": require("./images/0213691001.jpg"),
    "213691073": require("./images/0213691073.jpg"),
    "213691075": require("./images/0213691075.jpg"),
    "213691080": require("./images/0213691080.jpg"),
    "213691083": require("./images/0213691083.jpg"),
    "214844001": require("./images/0214844001.jpg"),
    "214844002": require("./images/0214844002.jpg"),
    "214844003": require("./images/0214844003.jpg"),
    "214844004": require("./images/0214844004.jpg"),
    "214844008": require("./images/0214844008.jpg"),
    "215248002": require("./images/0215248002.jpg"),
    "215303001": require("./images/0215303001.jpg"),
    "215303002": require("./images/0215303002.jpg"),
    "215303005": require("./images/0215303005.jpg"),
    "215337001": require("./images/0215337001.jpg"),
    "215337003": require("./images/0215337003.jpg"),
    "215337038": require("./images/0215337038.jpg"),
    "215337039": require("./images/0215337039.jpg"),
    "215337059": require("./images/0215337059.jpg"),
    "215337066": require("./images/0215337066.jpg"),
    "215337067": require("./images/0215337067.jpg"),
    "215589001": require("./images/0215589001.jpg"),
    "215589002": require("./images/0215589002.jpg"),
    "216081011": require("./images/0216081011.jpg"),
    "217207045": require("./images/0217207045.jpg"),
    "217207046": require("./images/0217207046.jpg"),
    "217207047": require("./images/0217207047.jpg"),
    "217207048": require("./images/0217207048.jpg"),
    "217207055": require("./images/0217207055.jpg"),
    "217727002": require("./images/0217727002.jpg"),
    "217727003": require("./images/0217727003.jpg"),
    "217727018": require("./images/0217727018.jpg"),
    "218354001": require("./images/0218354001.jpg"),
    "218354020": require("./images/0218354020.jpg"),
    "218354045": require("./images/0218354045.jpg"),
    "218354047": require("./images/0218354047.jpg"),
    "218829002": require("./images/0218829002.jpg"),
    "218829014": require("./images/0218829014.jpg"),
    "218829015": require("./images/0218829015.jpg"),
    "219075014": require("./images/0219075014.jpg"),
    "219075017": require("./images/0219075017.jpg"),
    "219075021": require("./images/0219075021.jpg"),
    "219075023": require("./images/0219075023.jpg"),
    "219075028": require("./images/0219075028.jpg"),
  };




  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{ height: 500, width: "100%", resizeMode: 'cover' }}
          source={IMAGE_MAPPING[produit.article_id]}
        />
        <View style={styles.detailsView}>
          <View style={styles.productTitleView}>
            <Text style={styles.productTitle}>{produit.prod_name}</Text>
          </View>
          <View style={styles.productPriceView}>
            <Text style={styles.discountedPriceText}>Prix : {produit.prix} DT </Text>
          </View>
          <View style={styles.productPriceView}>
            <TouchableOpacity
              onPress={() => {
                increaseQte()
              }}>
              <AntDesign style={{ marginRight: 15 }} name="pluscircle" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.discountedPriceText}>Quantité : {qty} </Text>
            <TouchableOpacity
              onPress={() => {
                descreaseQte()
              }}>
              <AntDesign style={{ marginLeft: 10 }} name="minuscircle" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 10,
              }}
            >
              Taille :
            </Text>
            <View>
              <RadioButtonGroupTailles
                tailles={tailles}
                selectedOption={selectedOption}
                onSelect={handleSelect}
              />
            </View>

          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 10,
              }}
            >
              Couleur :
            </Text>
            <View>
              <RadioButtonGroupCouleurs
                couleurs={couleurs}
                selectedOption={selectedOptionCouleur}
                onSelect={handleSelectCouleur}
              />
            </View>

          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
          {selectedOption == null || selectedOptionCouleur == null ? (<></>) : (<TouchableOpacity onPress={() => {
            addCommande()
          }} style={styles.buyNowButton}>
            <Text style={styles.buttonText}>Commander</Text>
          </TouchableOpacity>)}

        </View>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              marginHorizontal: 10,
            }}
          >
            Les produits similaires
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10 }}>
              {similarProducts.map((item) => (
                <TouchableOpacity onPress={() => {
                  navigation.navigate("ProduitDetails", {
                    article_id: item.article_id,
                  });
                }} style={{ width: 180, marginHorizontal: 10 }}>
                  <View style={styles.moreProductImageView}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      source={IMAGE_MAPPING[item.article_id]}
                    />
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.moreProductName}>
                      {item.prod_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{ height: 40 }}></View>
        <View>
          <View>
            <View>

            </View>
          </View>
        </View>
        {/* <TextInput style={[
          styles.input,
          {
            height: 100,
            paddingVertical: 10,
            textAlignVertical: 'top'
          }
        ]}
          multiline={true}
          placeholder="s'il vous plait placer votre commentaire ici" />
        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.buttonText}>Commenter</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    borderBottomColor: '#dfe4fe',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18
  },
  detailsView: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  productTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 28
  },
  productPriceView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPriceText: { fontSize: 15 },
  actualPriceText: {
    color: '#222',
    marginLeft: 10,
    textDecorationLine: 'line-through',
    fontSize: 15
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#111',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  addToCartButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#111',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff'
  },
  tag: {
    borderRadius: 4,
    backgroundColor: '#FFF',
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabel: {
    color: '#333',
  },
  tagSelected: {
    backgroundColor: '#333',
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabelSelected: {
    color: '#FFF',
  },
  productDescriptionHeader: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dfe4fe',
  },
  moreProductImageView: {
    flex: 1,
    height: 240,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  moreProductName: {
    fontSize: 16,
  },
  moreProductPriceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  moreProductPrice: {
    fontSize: 16,
  },
  moreProductIcon: {
    marginLeft: 10,
  },
  moreProductBuyButton: {
    backgroundColor: '#111',
    marginTop: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreProductBuyButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  radioView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
    marginTop: 2
  },
  radioViewText: {
    fontSize: 16,
    fontWeight: '500'
  },
  input: {
    width: "80%",
    height: 44,
    backgroundColor: "#f1f3f6",
    borderRadius: 6,
    paddingHorizontal: 10
  },
  subheading: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  cardHeader: {
    backgroundColor: '#6a90eb',
  },
  footer: {
    width: '100%',
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});




