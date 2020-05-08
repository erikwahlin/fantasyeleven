import apis from './api';

const players = [
    {
        createdAt: 1585306549426,
        name: 'Bernd Leno',
        position: 'Goalkeeper',
        price: '5.0',
        club: 'Arsenal',
        uid: '-M3QcYkDw8jrP415N0Ql'
    },
    {
        createdAt: 1585306549429,
        name: 'Emiliano Martines',
        position: 'Goalkeeper',
        price: '4.3',
        club: 'Arsenal',
        uid: '-M3QcYkFIXM8B24jL2LL'
    },
    {
        createdAt: 1585306549431,
        name: 'Hector Bellerin',
        position: 'Defender',
        price: '5.5',
        club: 'Arsenal',
        uid: '-M3QcYkG2jxJNLwkCGHY'
    },
    {
        createdAt: 1585306549431,
        name: 'Sokratis',
        position: 'Defender',
        price: '5.0',
        club: 'Arsenal',
        uid: '-M3QcYkHrJnOWiHZEasP'
    },
    {
        createdAt: 1585306549433,
        name: 'Rob Holding',
        position: 'Defender',
        price: '4.5',
        club: 'Arsenal',
        uid: '-M3QcYkI7juTRgLH21_d'
    },
    {
        createdAt: 1585306549434,
        name: 'Shkodran Mustafi',
        position: 'Defender',
        price: '5.0',
        club: 'Arsenal',
        uid: '-M3QcYkI7juTRgLH21_e'
    },
    {
        createdAt: 1585306549438,
        name: 'Sead Kolasinac',
        position: 'Defender',
        price: '5.5',
        club: 'Arsenal',
        uid: '-M3QcYkK_V60NFUPfaU8'
    },
    {
        createdAt: 1585306549439,
        name: 'Calum Chambers',
        position: 'Defender',
        price: '4.5',
        club: 'Arsenal',
        uid: '-M3QcYkK_V60NFUPfaU9'
    },
    {
        createdAt: 1585306549441,
        name: 'Kieran Tierney',
        position: 'Defender',
        price: '5.5',
        club: 'Arsenal',
        uid: '-M3QcYkLz4lhk2lr6GnF'
    },
    {
        createdAt: 1585306549442,
        name: 'Davis Luiz',
        position: 'Defender',
        price: '5.5',
        club: 'Arsenal',
        uid: '-M3QcYkMYh5D8wP2rfq5'
    },
    {
        createdAt: 1585306549444,
        name: 'Ainsley Maitland-Niles',
        position: 'Defender',
        price: '4.5',
        club: 'Arsenal',
        uid: '-M3QcYkNEeDge1yZrKQZ'
    },
    {
        createdAt: 1585306549445,
        name: 'Mezut Özil',
        position: 'Midfielder',
        price: '7.5',
        club: 'Arsenal',
        uid: '-M3QcYkNEeDge1yZrKQ_'
    },
    {
        createdAt: 1585306549542,
        name: 'Lucas Torreira',
        position: 'Midfielder',
        price: '5.0',
        club: 'Arsenal',
        uid: '-M3QcYkOth8pqvQ_rMWo'
    },
    {
        createdAt: 1585306549544,
        name: 'Matteo Guendouzi',
        position: 'Midfielder',
        price: '4.5',
        club: 'Arsenal',
        uid: '-M3QcYkP9d_7VNxEq5uY'
    },
    {
        createdAt: 1585306549546,
        name: 'Granit Xhaka',
        position: 'Midfielder',
        price: '5.0',
        club: 'Arsenal',
        uid: '-M3QcYkQ0yOrlVW-jfUJ'
    },
    {
        createdAt: 1585306549548,
        name: 'Joseph Willock',
        position: 'Midfielder',
        price: '5.0',
        club: 'Arsenal',
        uid: '-M3QcYkQ0yOrlVW-jfUK'
    },
    {
        createdAt: 1585306549549,
        name: 'Dani Ceballos',
        position: 'Midfielder',
        price: '5.5',
        club: 'Arsenal',
        uid: '-M3QcYkR7Et-rKXAyKhQ'
    },
    {
        createdAt: 1585306549551,
        name: 'Nicolas Pépé',
        position: 'Midfielder',
        price: '9.0',
        club: 'Arsenal',
        uid: '-M3QcYkSdzutgxPQlrD9'
    },
    {
        createdAt: 1585306549553,
        name: 'Reiss Nelson',
        position: 'Midfielder',
        price: '5.5',
        club: 'Arsenal',
        uid: '-M3QcYkTFK355bHoLrVs'
    },
    {
        createdAt: 1585306549554,
        name: 'Bukayo Saka',
        position: 'Midfielder',
        price: '4.5',
        club: 'Arsenal',
        uid: '-M3QcYkTFK355bHoLrVt'
    },
    {
        createdAt: 1585306549556,
        name: 'Alexandre Lacazette',
        position: 'Forward',
        price: '9.5',
        club: 'Arsenal',
        uid: '-M3QcYkVFZJ83rmljPt4'
    },
    {
        createdAt: 1585306549557,
        name: 'Pierre-Emerick Aubameyang',
        position: 'Forward',
        price: '11.0',
        club: 'Arsenal',
        uid: '-M3QcYkWjjgLB4j1Hcmu'
    },
    {
        createdAt: 1585306549559,
        name: 'Gabriel Martinelli',
        position: 'Forward',
        price: '4.5',
        club: 'Arsenal',
        uid: '-M3QcYkXn0fyQT0NZw7H'
    },
    {
        createdAt: 1585306549560,
        name: 'Eddie Nketiah',
        position: 'Forward',
        price: '4.5',
        club: 'Arsenal',
        uid: '-M3QcYkXn0fyQT0NZw7I'
    },
    {
        createdAt: 1585306549561,
        name: 'Orjan Nyland',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYkY7Jv8Bem2DxyL'
    },
    {
        createdAt: 1585306549562,
        name: 'Jed Steer',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYkZXtc7j9IgaMxN'
    },
    {
        createdAt: 1585306549563,
        name: 'Tom Heaton',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYk_ikyJw9yuLALM'
    },
    {
        createdAt: 1585306549564,
        name: 'Pepe Reina',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYk_ikyJw9yuLALN'
    },
    {
        createdAt: 1585306549566,
        name: 'Neil Taylor',
        position: 'Defender',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYkahXHzZH9q-CiU'
    },
    {
        createdAt: 1585306549568,
        name: 'Ahmed El Mohamady',
        position: 'Defender',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYkbOr8NxFZQi5W5'
    },
    {
        createdAt: 1585306549569,
        name: 'Frederic Guilbert',
        position: 'Defender',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYkc0q5JDsszeh1o'
    },
    {
        createdAt: 1585306549571,
        name: 'Matt Targett',
        position: 'Defender',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYkdtfv1vgWeBSQl'
    },
    {
        createdAt: 1585306549572,
        name: 'Kortney Hause',
        position: 'Defender',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYkeS61swKVWH3JV'
    },
    {
        createdAt: 1585306549573,
        name: 'Tyrone Mings',
        position: 'Defender',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYkeS61swKVWH3JW'
    },
    {
        createdAt: 1585306549574,
        name: 'Bjorn Engels',
        position: 'Defender',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYkfcDZZ_U_iESAV'
    },
    {
        createdAt: 1585306549575,
        name: 'John McGinn',
        position: 'Midfielder',
        price: '5.5',
        club: 'Aston Villa',
        uid: '-M3QcYkg41Xo6AIvLoqd'
    },
    {
        createdAt: 1585306549576,
        name: 'Henri Lansbury',
        position: 'Midfielder',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYkg41Xo6AIvLoqe'
    },
    {
        createdAt: 1585306549577,
        name: 'Jack Grealish',
        position: 'Midfielder',
        price: '7.0',
        club: 'Aston Villa',
        uid: '-M3QcYkhKvIpqKKn9gDa'
    },
    {
        createdAt: 1585306549579,
        name: 'Conor Hourihane',
        position: 'Midfielder',
        price: '6.0',
        club: 'Aston Villa',
        uid: '-M3QcYkiV70KlIm-60NI'
    },
    {
        createdAt: 1585306549580,
        name: 'Keinan Davis',
        position: 'Midfielder',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYkiV70KlIm-60NJ'
    },
    {
        createdAt: 1585306549582,
        name: 'Jota',
        position: 'Midfielder',
        price: '6.0',
        club: 'Aston Villa',
        uid: '-M3QcYkjfic2LzPXkBK4'
    },
    {
        createdAt: 1585306549583,
        name: 'Anwar El Ghazi',
        position: 'Midfielder',
        price: '5.5',
        club: 'Aston Villa',
        uid: '-M3QcYkksEgooLfnFXMp'
    },
    {
        createdAt: 1585306549585,
        name: 'Trézéguet',
        position: 'Midfielder',
        price: '5.5',
        club: 'Aston Villa',
        uid: '-M3QcYkksEgooLfnFXMq'
    },
    {
        createdAt: 1585306549586,
        name: 'Douglas Luiz',
        position: 'Midfielder',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYklgqUuzB0jlL7P'
    },
    {
        createdAt: 1585306549588,
        name: 'Marvelous Nakamba',
        position: 'Midfielder',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYkmO7vUxBDhnf2e'
    },
    {
        createdAt: 1585306549590,
        name: 'Daniel Drinkwater',
        position: 'Midfielder',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYknVfA8b8m9C31Q'
    },
    {
        createdAt: 1585306549591,
        name: 'Indiana Vassilev',
        position: 'Midfielder',
        price: '4.5',
        club: 'Aston Villa',
        uid: '-M3QcYknVfA8b8m9C31R'
    },
    {
        createdAt: 1585306549593,
        name: 'Wesley',
        position: 'Forward',
        price: '5.5',
        club: 'Aston Villa',
        uid: '-M3QcYko6i2HFVCgjdOS'
    },
    {
        createdAt: 1585306549594,
        name: 'Mbwana Samatta',
        position: 'Forward',
        price: '6.0',
        club: 'Aston Villa',
        uid: '-M3QcYkpYTf7ZJHWkAxG'
    },
    {
        createdAt: 1585306549596,
        name: 'Borja Bastón',
        position: 'Forward',
        price: '5.5',
        club: 'Aston Villa',
        uid: '-M3QcYkqujDI2EYDhqwK'
    },
    {
        createdAt: 1585306549597,
        name: 'Artur Boruc',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYkqujDI2EYDhqwL'
    },
    {
        createdAt: 1585306549599,
        name: 'Mark Travers',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYkrMaGidFbNFNCm'
    },
    {
        createdAt: 1585306549600,
        name: 'Aaron Ramsdale',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYktxl9_q9TvLBq-'
    },
    {
        createdAt: 1585306549601,
        name: 'Simon Francis',
        position: 'Defender',
        price: '4.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYktxl9_q9TvLBq0'
    },
    {
        createdAt: 1585306549602,
        name: 'Steve Cook',
        position: 'Defender',
        price: '5.0',
        club: 'AFC Bournemouth',
        uid: '-M3QcYkuGwd5iaWYfMxm'
    },
    {
        createdAt: 1585306549604,
        name: 'Nathan Aké',
        position: 'Defender',
        price: '5.0',
        club: 'AFC Bournemouth',
        uid: '-M3QcYkvhDmTYt794YIu'
    },
    {
        createdAt: 1585306549605,
        name: 'Charlie Daniels',
        position: 'Defender',
        price: '4.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYkvhDmTYt794YIv'
    },
    {
        createdAt: 1585306549606,
        name: 'Adam Smith',
        position: 'Defender',
        price: '4.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYkwFAZyaXXhXAFV'
    },
    {
        createdAt: 1585306549608,
        name: 'Diego Rico',
        position: 'Defender',
        price: '4.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYkxZhkCV9ywkYFh'
    },
    {
        createdAt: 1585306549609,
        name: 'Jack Simpson',
        position: 'Defender',
        price: '4.0',
        club: 'AFC Bournemouth',
        uid: '-M3QcYkxZhkCV9ywkYFi'
    },
    {
        createdAt: 1585306549610,
        name: 'Chris Mepham',
        position: 'Defender',
        price: '4.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYkyHmGG83rub03m'
    },
    {
        createdAt: 1585306549611,
        name: 'Lloyd Kelly',
        position: 'Defender',
        price: '4.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYkzLgh-GoF-JYOZ'
    },
    {
        createdAt: 1585306549612,
        name: 'Jack Stacey',
        position: 'Defender',
        price: '4.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYkzLgh-GoF-JYO_'
    },
    {
        createdAt: 1585306549614,
        name: 'Dan Gosling',
        position: 'Midfielder',
        price: '5.0',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl-TlW7VOpYXeNo'
    },
    {
        createdAt: 1585306549616,
        name: 'Andrew Surman',
        position: 'Midfielder',
        price: '5.0',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl-TlW7VOpYXeNp'
    },
    {
        createdAt: 1585306549616,
        name: 'Jefferson Lerma',
        position: 'Midfielder',
        price: '5.0',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl0LALwcDzuBLei'
    },
    {
        createdAt: 1585306549617,
        name: 'Jordon Ibe',
        position: 'Midfielder',
        price: '4.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl1CvRggsZUTrED'
    },
    {
        createdAt: 1585306549618,
        name: 'Lewis Cook',
        position: 'Midfielder',
        price: '5.0',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl1CvRggsZUTrEE'
    },
    {
        createdAt: 1585306549620,
        name: 'Junios Stanislas',
        position: 'Midfielder',
        price: '6.0',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl2vOcMivdKCb74'
    },
    {
        createdAt: 1585306549621,
        name: 'David Brooks',
        position: 'Midfielder',
        price: '6.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl2vOcMivdKCb75'
    },
    {
        createdAt: 1585306549622,
        name: 'Ryan Fraser',
        position: 'Midfielder',
        price: '7.0',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl3zXkpcM7yOOlK'
    },
    {
        createdAt: 1585306549623,
        name: 'Philip Billing',
        position: 'Midfielder',
        price: '5.0',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl4K-FkvEwBuCfN'
    },
    {
        createdAt: 1585306549625,
        name: 'Harry Wilson',
        position: 'Midfielder',
        price: '6.0',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl4K-FkvEwBuCfO'
    },
    {
        createdAt: 1585306549625,
        name: 'Callum Wilson',
        position: 'Forward',
        price: '7.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl5mvUXesReg2_x'
    },
    {
        createdAt: 1585306549627,
        name: 'Joshua King',
        position: 'Forward',
        price: '6.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl6O8Zw_RZ8owaZ'
    },
    {
        createdAt: 1585306549628,
        name: 'Dominic Solanke',
        position: 'Forward',
        price: '5.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl6O8Zw_RZ8owa_'
    },
    {
        createdAt: 1585306549629,
        name: 'Sam Surridge',
        position: 'Forward',
        price: '4.5',
        club: 'AFC Bournemouth',
        uid: '-M3QcYl7cLziMj2ozt30'
    },
    {
        createdAt: 1585306549630,
        name: 'Mat Ryan',
        position: 'Goalkeeper',
        price: '5.0',
        club: 'Brighton',
        uid: '-M3QcYl8YgL_vpCQiC6T'
    },
    {
        createdAt: 1585306549631,
        name: 'David Button',
        position: 'Goalkeeper',
        price: '4.0',
        club: 'Brighton',
        uid: '-M3QcYl8YgL_vpCQiC6U'
    },
    {
        createdAt: 1585306549633,
        name: 'Shane Duffy',
        position: 'Defender',
        price: '5.0',
        club: 'Brighton',
        uid: '-M3QcYl9LkTyOCbLNYW_'
    },
    {
        createdAt: 1585306549634,
        name: 'Lewis Dunk',
        position: 'Defender',
        price: '5.0',
        club: 'Brighton',
        uid: '-M3QcYlAizT_2MoGSifo'
    },
    {
        createdAt: 1585306549636,
        name: 'Martín Montoya',
        position: 'Defender',
        price: '4.5',
        club: 'Brighton',
        uid: '-M3QcYlAizT_2MoGSifp'
    },
    {
        createdAt: 1585306549637,
        name: 'Bernardo',
        position: 'Defender',
        price: '4.5',
        club: 'Brighton',
        uid: '-M3QcYlBCml18IGO1SIW'
    },
    {
        createdAt: 1585306549638,
        name: 'Dan Burn',
        position: 'Defender',
        price: '4.5',
        club: 'Brighton',
        uid: '-M3QcYlBCml18IGO1SIX'
    },
    {
        createdAt: 1585306549639,
        name: 'Ezequiel Schelotto',
        position: 'Defender',
        price: '4.0',
        club: 'Brighton',
        uid: '-M3QcYlCxRqgF3d2yUgJ'
    },
    {
        createdAt: 1585306549641,
        name: 'Adam Webster',
        position: 'Defender',
        price: '4.5',
        club: 'Brighton',
        uid: '-M3QcYlDhfG2_RaoRNG3'
    },
    {
        createdAt: 1585306549641,
        name: 'Tariq Lamptey',
        position: 'Defender',
        price: '4.0',
        club: 'Brighton',
        uid: '-M3QcYlDhfG2_RaoRNG4'
    },
    {
        createdAt: 1585306549643,
        name: 'Yves Bissouma',
        position: 'Midfielder',
        price: '5.0',
        club: 'Brighton',
        uid: '-M3QcYlEKM2CSaadNBHk'
    },
    {
        createdAt: 1585306549645,
        name: 'Pascal Gross',
        position: 'Midfielder',
        price: '6.5',
        club: 'Brighton',
        uid: '-M3QcYlFddNKApdQIn91'
    },
    {
        createdAt: 1585306549647,
        name: 'Solly March',
        position: 'Midfielder',
        price: '4.5',
        club: 'Brighton',
        uid: '-M3QcYlFddNKApdQIn92'
    },
    {
        createdAt: 1585306549649,
        name: 'Davy Propper',
        position: 'Midfielder',
        price: '5.0',
        club: 'Brighton',
        uid: '-M3QcYlGjjiyN20q1VMz'
    },
    {
        createdAt: 1585306549650,
        name: 'Leandra Trossard',
        position: 'Midfielder',
        price: '6.0',
        club: 'Brighton',
        uid: '-M3QcYlH3RWUnyiQ-Wl2'
    },
    {
        createdAt: 1585306549652,
        name: 'Aaron Mooy',
        position: 'Midfielder',
        price: '5.0',
        club: 'Brighton',
        uid: '-M3QcYlIeYnSgkt3Npsc'
    },
    {
        createdAt: 1585306549653,
        name: 'Alireza Jahanbakhsh',
        position: 'Midfielder',
        price: '6.0',
        club: 'Brighton',
        uid: '-M3QcYlJ0xo024XTZdLZ'
    },
    {
        createdAt: 1585306549655,
        name: 'Glenn Murray',
        position: 'Forward',
        price: '5.5',
        club: 'Brighton',
        uid: '-M3QcYlKXUEzxxnBmbM6'
    },
    {
        createdAt: 1585306549656,
        name: 'Neal Maupay',
        position: 'Forward',
        price: '6.0',
        club: 'Brighton',
        uid: '-M3QcYlKXUEzxxnBmbM7'
    },
    {
        createdAt: 1585306549657,
        name: 'Aaron Connolly',
        position: 'Forward',
        price: '4.5',
        club: 'Brighton',
        uid: '-M3QcYlL_ECNBcCj0QnJ'
    },
    {
        createdAt: 1585306549658,
        name: 'Joe Hart',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Burnley',
        uid: '-M3QcYlL_ECNBcCj0QnK'
    },
    {
        createdAt: 1585306549660,
        name: 'Nick Pope',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Burnley',
        uid: '-M3QcYlMwWhTekOVJEIR'
    },
    {
        createdAt: 1585306549661,
        name: 'Bailey Peacock-Farrell',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Burnley',
        uid: '-M3QcYlMwWhTekOVJEIS'
    },
    {
        createdAt: 1585306549662,
        name: 'Matthew Lowton',
        position: 'Defender',
        price: '4.5',
        club: 'Burnley',
        uid: '-M3QcYlNbTYUSWHmAnV0'
    },
    {
        createdAt: 1585306549663,
        name: 'Charlie Taylor',
        position: 'Defender',
        price: '4.5',
        club: 'Burnley',
        uid: '-M3QcYlNbTYUSWHmAnV1'
    },
    {
        createdAt: 1585306549664,
        name: 'James Tarkowski',
        position: 'Defender',
        price: '5.0',
        club: 'Burnley',
        uid: '-M3QcYlOKXj4YD4CJX6o'
    },
    {
        createdAt: 1585306549666,
        name: 'Ben Mee',
        position: 'Defender',
        price: '5.0',
        club: 'Burnley',
        uid: '-M3QcYlPWL4xztLv_cAU'
    },
    {
        createdAt: 1585306549667,
        name: 'Ben Gibson',
        position: 'Defender',
        price: '4.0',
        club: 'Burnley',
        uid: '-M3QcYlPWL4xztLv_cAV'
    },
    {
        createdAt: 1585306549669,
        name: 'Phil Bardsley',
        position: 'Defender',
        price: '4.5',
        club: 'Burnley',
        uid: '-M3QcYlQ6rX0MLcoBGgP'
    },
    {
        createdAt: 1585306549671,
        name: 'Kevin Long',
        position: 'Defender',
        price: '4.5',
        club: 'Burnley',
        uid: '-M3QcYlQ6rX0MLcoBGgQ'
    },
    {
        createdAt: 1585306549671,
        name: 'Erik Pieters',
        position: 'Defender',
        price: '4.5',
        club: 'Burnley',
        uid: '-M3QcYlRU_QqLHmq--Er'
    },
    {
        createdAt: 1585306549673,
        name: 'Jack Cork',
        position: 'Midfielder',
        price: '5.0',
        club: 'Burnley',
        uid: '-M3QcYlRU_QqLHmq--Es'
    },
    {
        createdAt: 1585306549675,
        name: 'Jóhann Gudmundsson',
        position: 'Midfielder',
        price: '6.0',
        club: 'Burnley',
        uid: '-M3QcYlSypXBHdTiwaNe'
    },
    {
        createdAt: 1585306549677,
        name: 'Robbie Brady',
        position: 'Midfielder',
        price: '5.5',
        club: 'Burnley',
        uid: '-M3QcYlSypXBHdTiwaNf'
    },
    {
        createdAt: 1585306549678,
        name: 'Jeff Hendrick',
        position: 'Midfielder',
        price: '5.5',
        club: 'Burnley',
        uid: '-M3QcYlTAQOKos9PpUr1'
    },
    {
        createdAt: 1585306549680,
        name: 'Ashley Westwood',
        position: 'Midfielder',
        price: '5.5',
        club: 'Burnley',
        uid: '-M3QcYlTAQOKos9PpUr2'
    },
    {
        createdAt: 1585306549682,
        name: 'Aaron Lennon',
        position: 'Midfielder',
        price: '5.0',
        club: 'Burnley',
        uid: '-M3QcYlUNCDGaz4bnkfL'
    },
    {
        createdAt: 1585306549683,
        name: 'Matej Vydra',
        position: 'Forward',
        price: '5.5',
        club: 'Burnley',
        uid: '-M3QcYlUNCDGaz4bnkfM'
    },
    {
        createdAt: 1585306549685,
        name: 'Dwight McNeil',
        position: 'Midfielder',
        price: '6.0',
        club: 'Burnley',
        uid: '-M3QcYlVjLrIS9MLr-w3'
    },
    {
        createdAt: 1585306549687,
        name: 'Mace Goodridge',
        position: 'Midfielder',
        price: '4.5',
        club: 'Burnley',
        uid: '-M3QcYlVjLrIS9MLr-w4'
    },
    {
        createdAt: 1585306549688,
        name: 'Josh Brownhill',
        position: 'Midfielder',
        price: '5.0',
        club: 'Burnley',
        uid: '-M3QcYlWEjm04K6c-pfc'
    },
    {
        createdAt: 1585306549690,
        name: 'Ashley Barnes',
        position: 'Forward',
        price: '6.0',
        club: 'Burnley',
        uid: '-M3QcYlWEjm04K6c-pfd'
    },
    {
        createdAt: 1585306549693,
        name: 'Chris Wood',
        position: 'Forward',
        price: '6.5',
        club: 'Burnley',
        uid: '-M3QcYlXxhd0Z-dNCwBe'
    },
    {
        createdAt: 1585306549694,
        name: 'Jay Rodriguez ',
        position: 'Forward',
        price: '6.0',
        club: 'Burnley',
        uid: '-M3QcYlYUhthNRZzYCCC'
    },
    {
        createdAt: 1585306549696,
        name: 'Kepa Arrizabalaga',
        position: 'Goalkeeper',
        price: '6.0',
        club: 'Chelsea',
        uid: '-M3QcYlYUhthNRZzYCCD'
    },
    {
        createdAt: 1585306549697,
        name: 'Willy Caballero',
        position: 'Goalkeeper',
        price: '5.0',
        club: 'Chelsea',
        uid: '-M3QcYlZ2j67dBQ2QJyo'
    },
    {
        createdAt: 1585306549699,
        name: 'Antonio Rüdiger',
        position: 'Defender',
        price: '6.0',
        club: 'Chelsea',
        uid: '-M3QcYlZ2j67dBQ2QJyp'
    },
    {
        createdAt: 1585306549701,
        name: 'Marcos Alonso',
        position: 'Defender',
        price: '6.5',
        club: 'Chelsea',
        uid: '-M3QcYl_7ta9qgbNDk6O'
    },
    {
        createdAt: 1585306549703,
        name: 'Andreas Christensen',
        position: 'Defender',
        price: '5.0',
        club: 'Chelsea',
        uid: '-M3QcYl_7ta9qgbNDk6P'
    },
    {
        createdAt: 1585306549704,
        name: 'César Azpilicueta',
        position: 'Defender',
        price: '6.0',
        club: 'Chelsea',
        uid: '-M3QcYlaKx1uBbfNap-1'
    },
    {
        createdAt: 1585306549706,
        name: 'Emerson',
        position: 'Defender',
        price: '5.5',
        club: 'Chelsea',
        uid: '-M3QcYlbLj-AN2Ds_zBs'
    },
    {
        createdAt: 1585306549707,
        name: 'Reece James',
        position: 'Defender',
        price: '5.0',
        club: 'Chelsea',
        uid: '-M3QcYlbLj-AN2Ds_zBt'
    },
    {
        createdAt: 1585306549709,
        name: 'Kurt Zouma',
        position: 'Defender',
        price: '5.0',
        club: 'Chelsea',
        uid: '-M3QcYlcz2-1G_u-YF88'
    },
    {
        createdAt: 1585306549710,
        name: 'Fikayo Tomori',
        position: 'Defender',
        price: '4.5',
        club: 'Chelsea',
        uid: '-M3QcYlcz2-1G_u-YF89'
    },
    {
        createdAt: 1585306549711,
        name: 'Jorginho',
        position: 'Midfielder',
        price: '5.0',
        club: 'Chelsea',
        uid: '-M3QcYldAQyqLDHhhwz9'
    },
    {
        createdAt: 1585306549712,
        name: "N'Golo Kanté",
        position: 'Midfielder',
        price: '5.0',
        club: 'Chelsea',
        uid: '-M3QcYldAQyqLDHhhwzA'
    },
    {
        createdAt: 1585306549714,
        name: 'Ross Barkley',
        position: 'Midfielder',
        price: '5.5',
        club: 'Chelsea',
        uid: '-M3QcYle7QT9dlZoSYxO'
    },
    {
        createdAt: 1585306549715,
        name: 'Ruben Loftus-Cheek',
        position: 'Midfielder',
        price: '6.5',
        club: 'Chelsea',
        uid: '-M3QcYle7QT9dlZoSYxP'
    },
    {
        createdAt: 1585306549716,
        name: 'Christian Pulisic',
        position: 'Midfielder',
        price: '7.0',
        club: 'Chelsea',
        uid: '-M3QcYlfEUj6fA5tfTeM'
    },
    {
        createdAt: 1585306549718,
        name: 'Mateo Kovacic',
        position: 'Midfielder',
        price: '5.5',
        club: 'Chelsea',
        uid: '-M3QcYlfEUj6fA5tfTeN'
    },
    {
        createdAt: 1585306549719,
        name: 'Mason Mount',
        position: 'Midfielder',
        price: '6.0',
        club: 'Chelsea',
        uid: '-M3QcYlgBoLqJcxsRJ6y'
    },
    {
        createdAt: 1585306549720,
        name: 'Billy Gilmour',
        position: 'Midfielder',
        price: '4.5',
        club: 'Chelsea',
        uid: '-M3QcYlhG2k6wy0mNDM8'
    },
    {
        createdAt: 1585306549721,
        name: 'Pedro',
        position: 'Midfielder',
        price: '7.0',
        club: 'Chelsea',
        uid: '-M3QcYliAacf6rU8qk91'
    },
    {
        createdAt: 1585306549722,
        name: 'Willian',
        position: 'Midfielder',
        price: '7.0',
        club: 'Chelsea',
        uid: '-M3QcYljrpPRDEPFNzJP'
    },
    {
        createdAt: 1585306549723,
        name: 'Callum Hudson-Odoi',
        position: 'Midfielder',
        price: '5.5',
        club: 'Chelsea',
        uid: '-M3QcYljrpPRDEPFNzJQ'
    },
    {
        createdAt: 1585306549724,
        name: 'Olivier Giroud',
        position: 'Forward',
        price: '6.5',
        club: 'Chelsea',
        uid: '-M3QcYlk0oWAgAAWvz6U'
    },
    {
        createdAt: 1585306549725,
        name: 'Tammy Abraham',
        position: 'Forward',
        price: '7.5',
        club: 'Chelsea',
        uid: '-M3QcYlk0oWAgAAWvz6V'
    },
    {
        createdAt: 1585306549726,
        name: 'Michy Batshuayi',
        position: 'Forward',
        price: '7.0',
        club: 'Chelsea',
        uid: '-M3QcYll4sZR_BbVsX4l'
    },
    {
        createdAt: 1585306549727,
        name: 'Wayne Hennessey',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Crystal Palace',
        uid: '-M3QcYll4sZR_BbVsX4m'
    },
    {
        createdAt: 1585306549728,
        name: 'Vicente Guaita',
        position: 'Goalkeeper',
        price: '5.0',
        club: 'Crystal Palace',
        uid: '-M3QcYlmpx_ZI_9uSuGj'
    },
    {
        createdAt: 1585306549730,
        name: 'Stephen Henderson',
        position: 'Goalkeeper',
        price: '4.0',
        club: 'Crystal Palace',
        uid: '-M3QcYlmpx_ZI_9uSuGk'
    },
    {
        createdAt: 1585306549731,
        name: 'Joel Ward',
        position: 'Defender',
        price: '4.5',
        club: 'Crystal Palace',
        uid: '-M3QcYlnnnwLWya1GIsI'
    },
    {
        createdAt: 1585306549733,
        name: 'Patrick van Aanholt',
        position: 'Defender',
        price: '5.5',
        club: 'Crystal Palace',
        uid: '-M3QcYlnnnwLWya1GIsJ'
    },
    {
        createdAt: 1585306549734,
        name: 'James Tomkins',
        position: 'Defender',
        price: '5.0',
        club: 'Crystal Palace',
        uid: '-M3QcYloI5I_N3IgjjB4'
    },
    {
        createdAt: 1585306549735,
        name: 'Mamadou Sakho',
        position: 'Defender',
        price: '5.0',
        club: 'Crystal Palace',
        uid: '-M3QcYloI5I_N3IgjjB5'
    },
    {
        createdAt: 1585306549735,
        name: 'Jeffrey Schlupp',
        position: 'Midfielder',
        price: '5.5',
        club: 'Crystal Palace',
        uid: '-M3QcYlprhO_zDT8exzp'
    },
    {
        createdAt: 1585306549737,
        name: 'Martin Kelly',
        position: 'Defender',
        price: '4.5',
        club: 'Crystal Palace',
        uid: '-M3QcYlprhO_zDT8exzq'
    },
    {
        createdAt: 1585306549739,
        name: 'Jairo Riedewald',
        position: 'Defender',
        price: '4.5',
        club: 'Crystal Palace',
        uid: '-M3QcYlqyOhrdiJaaaf-'
    },
    {
        createdAt: 1585306549740,
        name: 'Scott Dann',
        position: 'Defender',
        price: '4.5',
        club: 'Crystal Palace',
        uid: '-M3QcYlrm3pIxU4OD9Ci'
    },
    {
        createdAt: 1585306549742,
        name: 'Gary Cahill',
        position: 'Defender',
        price: '4.5',
        club: 'Crystal Palace',
        uid: '-M3QcYlrm3pIxU4OD9Cj'
    },
    {
        createdAt: 1585306549744,
        name: 'Tyrick Mitchell',
        position: 'Defender',
        price: '4.0',
        club: 'Crystal Palace',
        uid: '-M3QcYlsQfxdDqaC-wlW'
    },
    {
        createdAt: 1585306549745,
        name: 'Luka Milivojevic',
        position: 'Midfielder',
        price: '7.0',
        club: 'Crystal Palace',
        uid: '-M3QcYlt9f-INxrVpBHA'
    },
    {
        createdAt: 1585306549746,
        name: 'Max Meyer',
        position: 'Midfielder',
        price: '5.5',
        club: 'Crystal Palace',
        uid: '-M3QcYlud2BYunamA6VH'
    },
    {
        createdAt: 1585306549747,
        name: 'Cheikhou Kouyaté',
        position: 'Midfielder',
        price: '5.0',
        club: 'Crystal Palace',
        uid: '-M3QcYlud2BYunamA6VI'
    },
    {
        createdAt: 1585306549748,
        name: 'Andros Townsend',
        position: 'Midfielder',
        price: '6.0',
        club: 'Crystal Palace',
        uid: '-M3QcYlv1-RFoAuvY6EN'
    },
    {
        createdAt: 1585306549749,
        name: 'James McArthur',
        position: 'Midfielder',
        price: '5.5',
        club: 'Crystal Palace',
        uid: '-M3QcYlv1-RFoAuvY6EO'
    },
    {
        createdAt: 1585306549750,
        name: 'James McCarthy',
        position: 'Midfielder',
        price: '4.5',
        club: 'Crystal Palace',
        uid: '-M3QcYlwLZKZqz9GFhLA'
    },
    {
        createdAt: 1585306549752,
        name: 'Nya Kirby',
        position: 'Midfielder',
        price: '4.5',
        club: 'Crystal Palace',
        uid: '-M3QcYlwLZKZqz9GFhLB'
    },
    {
        createdAt: 1585306549753,
        name: 'Brandon Pierrick Keutcha',
        position: 'Midfielder',
        price: '4.5',
        club: 'Crystal Palace',
        uid: '-M3QcYlx-NQ-niFbRRyu'
    },
    {
        createdAt: 1585306549756,
        name: 'Wilfred Zaha',
        position: 'Midfielder',
        price: '7.0',
        club: 'Crystal Palace',
        uid: '-M3QcYlyxSU_s7kSE2a1'
    },
    {
        createdAt: 1585306549757,
        name: 'Christian Benteke',
        position: 'Forward',
        price: '6.0',
        club: 'Crystal Palace',
        uid: '-M3QcYlyxSU_s7kSE2a2'
    },
    {
        createdAt: 1585306549758,
        name: 'Jordan Ayew',
        position: 'Forward',
        price: '5.0',
        club: 'Crystal Palace',
        uid: '-M3QcYlzQpS2qTA5f4mx'
    },
    {
        createdAt: 1585306549759,
        name: 'Cenk Tosun',
        position: 'Forward',
        price: '6.0',
        club: 'Crystal Palace',
        uid: '-M3QcYlzQpS2qTA5f4my'
    },
    {
        createdAt: 1585306549760,
        name: 'Jordan Pickford',
        position: 'Goalkeeper',
        price: '5.5',
        club: 'Everton',
        uid: '-M3QcYm-Ww2BUQ4FA9Iq'
    },
    {
        createdAt: 1585306549761,
        name: 'Maarten Stekelenburg',
        position: 'Goalkeeper',
        price: '4.0',
        club: 'Everton',
        uid: '-M3QcYm-Ww2BUQ4FA9Ir'
    },
    {
        createdAt: 1585306549762,
        name: 'Leighton Baines',
        position: 'Defender',
        price: '5.0',
        club: 'Everton',
        uid: '-M3QcYm08DsM9YnoUeAX'
    },
    {
        createdAt: 1585306549763,
        name: 'Michael Keane',
        position: 'Defender',
        price: '5.5',
        club: 'Everton',
        uid: '-M3QcYm08DsM9YnoUeAY'
    },
    {
        createdAt: 1585306549764,
        name: 'Lucas Digne',
        position: 'Defender',
        price: '6.0',
        club: 'Everton',
        uid: '-M3QcYm13rypF1-iC04z'
    },
    {
        createdAt: 1585306549765,
        name: 'Yerrt Mina',
        position: 'Defender',
        price: '5.5',
        club: 'Everton',
        uid: '-M3QcYm13rypF1-iC05-'
    },
    {
        createdAt: 1585306549767,
        name: 'Séamus Coleman',
        position: 'Defender',
        price: '5.5',
        club: 'Everton',
        uid: '-M3QcYm26dtDEeUZntOa'
    },
    {
        createdAt: 1585306549768,
        name: 'Mason Holgate',
        position: 'Defender',
        price: '4.5',
        club: 'Everton',
        uid: '-M3QcYm26dtDEeUZntOb'
    },
    {
        createdAt: 1585306549769,
        name: 'Cuco Martina',
        position: 'Defender',
        price: '4.0',
        club: 'Everton',
        uid: '-M3QcYm38e7bqJO7ekZr'
    },
    {
        createdAt: 1585306549770,
        name: 'Djibril Sidibé',
        position: 'Defender',
        price: '5.5',
        club: 'Everton',
        uid: '-M3QcYm46hs7_BwWDiww'
    },
    {
        createdAt: 1585306549771,
        name: 'Morgan Schneiderlin',
        position: 'Midfielder',
        price: '4.5',
        club: 'Everton',
        uid: '-M3QcYm46hs7_BwWDiwx'
    },
    {
        createdAt: 1585306549772,
        name: 'Tom Davies',
        position: 'Midfielder',
        price: '5.5',
        club: 'Everton',
        uid: '-M3QcYm5VNkE4ZM6WtlN'
    },
    {
        createdAt: 1585306549774,
        name: 'André Gomes',
        position: 'Midfielder',
        price: '5.5',
        club: 'Everton',
        uid: '-M3QcYm5VNkE4ZM6WtlO'
    },
    {
        createdAt: 1585306549775,
        name: 'Fabian Delph',
        position: 'Defender',
        price: '5.5',
        club: 'Everton',
        uid: '-M3QcYm66xFM3lv5-PoW'
    },
    {
        createdAt: 1585306549776,
        name: 'Jean-Philippe Gbamin',
        position: 'Midfielder',
        price: '5.0',
        club: 'Everton',
        uid: '-M3QcYm7WL2D1qxAIx53'
    },
    {
        createdAt: 1585306549777,
        name: 'Beni Baningime',
        position: 'Midfielder',
        price: '4.5',
        club: 'Everton',
        uid: '-M3QcYm8Wxky9UNn6nQe'
    },
    {
        createdAt: 1585306549779,
        name: 'Gylfi Sigurdsson',
        position: 'Midfielder',
        price: '7.5',
        club: 'Everton',
        uid: '-M3QcYm8Wxky9UNn6nQf'
    },
    {
        createdAt: 1585306549780,
        name: 'Bernard',
        position: 'Midfielder',
        price: '6.5',
        club: 'Everton',
        uid: '-M3QcYm9xKrFRz-9Waoe'
    },
    {
        createdAt: 1585306549780,
        name: 'Richarlison',
        position: 'Midfielder',
        price: '8.0',
        club: 'Everton',
        uid: '-M3QcYmA7lah1iKdBecN'
    },
    {
        createdAt: 1585306549783,
        name: 'Theo Walcott',
        position: 'Midfielder',
        price: '6.5',
        club: 'Everton',
        uid: '-M3QcYmA7lah1iKdBecO'
    },
    {
        createdAt: 1585306549784,
        name: 'Alex Iwobi',
        position: 'Midfielder',
        price: '6.0',
        club: 'Everton',
        uid: '-M3QcYmByBekL8GxIYWQ'
    },
    {
        createdAt: 1585306549785,
        name: 'Oumar Niasse',
        position: 'Forward',
        price: '4.5',
        club: 'Everton',
        uid: '-M3QcYmByBekL8GxIYWR'
    },
    {
        createdAt: 1585306549787,
        name: 'Dominic Calvert-Lewin',
        position: 'Forward',
        price: '6.5',
        club: 'Everton',
        uid: '-M3QcYmClID4KOQi03dc'
    },
    {
        createdAt: 1585306549788,
        name: 'Moise Kean',
        position: 'Forward',
        price: '6.5',
        club: 'Everton',
        uid: '-M3QcYmClID4KOQi03dd'
    },
    {
        createdAt: 1585306549790,
        name: 'Anthony Gordon',
        position: 'Forward',
        price: '4.5',
        club: 'Everton',
        uid: '-M3QcYmDGxQqUYIjvHwV'
    },
    {
        createdAt: 1585306549791,
        name: 'Kasper Schmeichel',
        position: 'Goalkeeper',
        price: '5.5',
        club: 'Leicester City',
        uid: '-M3QcYmDGxQqUYIjvHwW'
    },
    {
        createdAt: 1585306549792,
        name: 'Danny Ward',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Leicester City',
        uid: '-M3QcYmEq-0D1XGyEFpY'
    },
    {
        createdAt: 1585306549793,
        name: 'Eldin Jakupovic',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Leicester City',
        uid: '-M3QcYmEq-0D1XGyEFpZ'
    },
    {
        createdAt: 1585306549794,
        name: 'Ben Chilwell',
        position: 'Defender',
        price: '6.0',
        club: 'Leicester City',
        uid: '-M3QcYmFYCutG9VoiYPA'
    },
    {
        createdAt: 1585306549795,
        name: 'Caglar Söyüncü',
        position: 'Defender',
        price: '5.0',
        club: 'Leicester City',
        uid: '-M3QcYmFYCutG9VoiYPB'
    },
    {
        createdAt: 1585306549796,
        name: 'Wes Morgan',
        position: 'Defender',
        price: '4.5',
        club: 'Leicester City',
        uid: '-M3QcYmGZnqahS03CrHf'
    },
    {
        createdAt: 1585306549797,
        name: 'Jonny Evans',
        position: 'Defender',
        price: '5.5',
        club: 'Leicester City',
        uid: '-M3QcYmGZnqahS03CrHg'
    },
    {
        createdAt: 1585306549798,
        name: 'Ricardo Pereira',
        position: 'Defender',
        price: '6.0',
        club: 'Leicester City',
        uid: '-M3QcYmHX7r9B3vn2Qbz'
    },
    {
        createdAt: 1585306549799,
        name: 'Christian Fuchs',
        position: 'Defender',
        price: '4.5',
        club: 'Leicester City',
        uid: '-M3QcYmHX7r9B3vn2Qc-'
    },
    {
        createdAt: 1585306549800,
        name: 'James Justin',
        position: 'Defender',
        price: '5.0',
        club: 'Leicester City',
        uid: '-M3QcYmI7vuRCSA1QNyq'
    },
    {
        createdAt: 1585306549801,
        name: 'Ryan Bennett',
        position: 'Defender',
        price: '5.0',
        club: 'Leicester City',
        uid: '-M3QcYmI7vuRCSA1QNyr'
    },
    {
        createdAt: 1585306549802,
        name: 'Daniel Amartey',
        position: 'Midfielder',
        price: '4.5',
        club: 'Leicester City',
        uid: '-M3QcYmJQ2v4zUbS2nr9'
    },
    {
        createdAt: 1585306549803,
        name: 'Demarai Gray',
        position: 'Midfielder',
        price: '5.0',
        club: 'Leicester City',
        uid: '-M3QcYmJQ2v4zUbS2nrA'
    },
    {
        createdAt: 1585306549804,
        name: 'James Maddison',
        position: 'Midfielder',
        price: '7.5',
        club: 'Leicester City',
        uid: '-M3QcYmKYuxjqzaCpqoy'
    },
    {
        createdAt: 1585306549806,
        name: 'Marc Albrighton',
        position: 'Midfielder',
        price: '5.5',
        club: 'Leicester City',
        uid: '-M3QcYmKYuxjqzaCpqoz'
    },
    {
        createdAt: 1585306549808,
        name: 'Harvey Barnes',
        position: 'Midfielder',
        price: '6.0',
        club: 'Leicester City',
        uid: '-M3QcYmLvB_OfmhXehHr'
    },
    {
        createdAt: 1585306549809,
        name: 'Matty James',
        position: 'Midfielder',
        price: '4.5',
        club: 'Leicester City',
        uid: '-M3QcYmLvB_OfmhXehHs'
    },
    {
        createdAt: 1585306549810,
        name: 'Nampalys Mendy',
        position: 'Midfielder',
        price: '4.5',
        club: 'Leicester City',
        uid: '-M3QcYmMhonXB3xsTmxK'
    },
    {
        createdAt: 1585306549811,
        name: 'Wilfred Ndidi',
        position: 'Midfielder',
        price: '5.0',
        club: 'Leicester City',
        uid: '-M3QcYmMhonXB3xsTmxL'
    },
    {
        createdAt: 1585306549813,
        name: 'Hamza Choudhury',
        position: 'Midfielder',
        price: '4.5',
        club: 'Leicester City',
        uid: '-M3QcYmNfJUECwRTwmTb'
    },
    {
        createdAt: 1585306549815,
        name: 'Youri Tielemans',
        position: 'Midfielder',
        price: '6.5',
        club: 'Leicester City',
        uid: '-M3QcYmNfJUECwRTwmTc'
    },
    {
        createdAt: 1585306549816,
        name: 'Dennis Praet',
        position: 'Midfielder',
        price: '5.5',
        club: 'Leicester City',
        uid: '-M3QcYmOFGcEN8XYD1H0'
    },
    {
        createdAt: 1585306549818,
        name: 'Ayoze Pérez',
        position: 'Midfielder',
        price: '6.0',
        club: 'Leicester City',
        uid: '-M3QcYmOFGcEN8XYD1H1'
    },
    {
        createdAt: 1585306549820,
        name: 'Kelechi Iheanacho',
        position: 'Forward',
        price: '6.0',
        club: 'Leicester City',
        uid: '-M3QcYmPgr-Ttu4FjW3I'
    },
    {
        createdAt: 1585306549821,
        name: 'Jamie Vardy',
        position: 'Forward',
        price: '9.5',
        club: 'Leicester City',
        uid: '-M3QcYmPgr-Ttu4FjW3J'
    },
    {
        createdAt: 1585306549823,
        name: 'Alisson',
        position: 'Goalkeeper',
        price: '6.0',
        club: 'Liverpool',
        uid: '-M3QcYmQd5vuwEF66uw-'
    },
    {
        createdAt: 1585306549825,
        name: 'Caoimhin Kelleher',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Liverpool',
        uid: '-M3QcYmQd5vuwEF66uw0'
    },
    {
        createdAt: 1585306549827,
        name: 'Adrián',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Liverpool',
        uid: '-M3QcYmR6SVFSGc2mAuW'
    },
    {
        createdAt: 1585306549829,
        name: 'Andy Lonergan',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Liverpool',
        uid: '-M3QcYmR6SVFSGc2mAuX'
    },
    {
        createdAt: 1585306549830,
        name: 'Dejan Lovren',
        position: 'Defender',
        price: '5.5',
        club: 'Liverpool',
        uid: '-M3QcYmStK1N-ZPQQz67'
    },
    {
        createdAt: 1585306549832,
        name: 'Trent Alexander-Arnold',
        position: 'Defender',
        price: '7.0',
        club: 'Liverpool',
        uid: '-M3QcYmStK1N-ZPQQz68'
    },
    {
        createdAt: 1585306549833,
        name: 'Virgil van Dijk',
        position: 'Defender',
        price: '6.5',
        club: 'Liverpool',
        uid: '-M3QcYmTOCN7ibZjZkmR'
    },
    {
        createdAt: 1585306549835,
        name: 'Andrew Robertson',
        position: 'Defender',
        price: '7.0',
        club: 'Liverpool',
        uid: '-M3QcYmTOCN7ibZjZkmS'
    },
    {
        createdAt: 1585306549837,
        name: 'Joseph Gomez',
        position: 'Defender',
        price: '5.5',
        club: 'Liverpool',
        uid: '-M3QcYmUh_GIH_gZ32KH'
    },
    {
        createdAt: 1585306549839,
        name: 'Joel Matip',
        position: 'Defender',
        price: '5.5',
        club: 'Liverpool',
        uid: '-M3QcYmUh_GIH_gZ32KI'
    },
    {
        createdAt: 1585306549840,
        name: 'Neco Williams',
        position: 'Defender',
        price: '4.0',
        club: 'Liverpool',
        uid: '-M3QcYmVcQv_AokdFXFS'
    },
    {
        createdAt: 1585306549842,
        name: 'Mohamed Salah',
        position: 'Midfielder',
        price: '13.0',
        club: 'Liverpool',
        uid: '-M3QcYmVcQv_AokdFXFT'
    },
    {
        createdAt: 1585306549843,
        name: 'Sadio Mané',
        position: 'Midfielder',
        price: '12.5',
        club: 'Liverpool',
        uid: '-M3QcYmVcQv_AokdFXFU'
    },
    {
        createdAt: 1585306549844,
        name: 'Jordan Henderson',
        position: 'Midfielder',
        price: '5.5',
        club: 'Liverpool',
        uid: '-M3QcYmWm0AQ3_DAYyye'
    },
    {
        createdAt: 1585306549845,
        name: 'Georginio Wijnaldum',
        position: 'Midfielder',
        price: '5.5',
        club: 'Liverpool',
        uid: '-M3QcYmWm0AQ3_DAYyyf'
    },
    {
        createdAt: 1585306549846,
        name: 'Alex Oxlade-Chamberlain',
        position: 'Midfielder',
        price: '6.0',
        club: 'Liverpool',
        uid: '-M3QcYmX0vsDUIqDuXre'
    },
    {
        createdAt: 1585306549848,
        name: 'James Milner',
        position: 'Midfielder',
        price: '5.5',
        club: 'Liverpool',
        uid: '-M3QcYmX0vsDUIqDuXrf'
    },
    {
        createdAt: 1585306549850,
        name: 'Fabinho',
        position: 'Midfielder',
        price: '5.5',
        club: 'Liverpool',
        uid: '-M3QcYmYYUPBseL3NeHL'
    },
    {
        createdAt: 1585306549851,
        name: 'Adam Lallana',
        position: 'Midfielder',
        price: '6.0',
        club: 'Liverpool',
        uid: '-M3QcYmZiVOJV1zTie0D'
    },
    {
        createdAt: 1585306549853,
        name: 'Naby Keita',
        position: 'Midfielder',
        price: '6.0',
        club: 'Liverpool',
        uid: '-M3QcYmZiVOJV1zTie0E'
    },
    {
        createdAt: 1585306549855,
        name: 'Xherdan Shaqiri',
        position: 'Midfielder',
        price: '6.5',
        club: 'Liverpool',
        uid: '-M3QcYm_2OjO9WHPvrul'
    },
    {
        createdAt: 1585306549856,
        name: 'Curtis Jones',
        position: 'Midfielder',
        price: '4.5',
        club: 'Liverpool',
        uid: '-M3QcYm_2OjO9WHPvrum'
    },
    {
        createdAt: 1585306549858,
        name: 'Takumi Minamino',
        position: 'Midfielder',
        price: '6.5',
        club: 'Liverpool',
        uid: '-M3QcYmanM6tiDgkBs_e'
    },
    {
        createdAt: 1585306549861,
        name: 'Harvey Elliott',
        position: 'Midfielder',
        price: '4.5',
        club: 'Liverpool',
        uid: '-M3QcYmanM6tiDgkBs_f'
    },
    {
        createdAt: 1585306549862,
        name: 'Roberto Firmino',
        position: 'Forward',
        price: '9.5',
        club: 'Liverpool',
        uid: '-M3QcYmbZZlnR9qxdPAz'
    },
    {
        createdAt: 1585306549876,
        name: 'Divock Origi',
        position: 'Forward',
        price: '5.5',
        club: 'Liverpool',
        uid: '-M3QcYmbZZlnR9qxdPB-'
    },
    {
        createdAt: 1585306549877,
        name: 'Ederson',
        position: 'Goalkeeper',
        price: '6.0',
        club: 'Manchester City',
        uid: '-M3QcYmbZZlnR9qxdPB0'
    },
    {
        createdAt: 1585306549878,
        name: 'Claudio Bravo',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Manchester City',
        uid: '-M3QcYmcIZhyjoY1fNY0'
    },
    {
        createdAt: 1585306549880,
        name: 'Scott Carson',
        position: 'Goalkeeper',
        price: '4.0',
        club: 'Manchester City',
        uid: '-M3QcYmeaWbqml9MVmD0'
    },
    {
        createdAt: 1585306549882,
        name: 'Kyle Walker',
        position: 'Defender',
        price: '6.0',
        club: 'Manchester City',
        uid: '-M3QcYmeaWbqml9MVmD1'
    },
    {
        createdAt: 1585306549884,
        name: 'Nicolas Otamendi',
        position: 'Defender',
        price: '5.5',
        club: 'Manchester City',
        uid: '-M3QcYmfJ18PV806QJCb'
    },
    {
        createdAt: 1585306549885,
        name: 'Benjamin Mendy',
        position: 'Defender',
        price: '5.5',
        club: 'Manchester City',
        uid: '-M3QcYmfJ18PV806QJCc'
    },
    {
        createdAt: 1585306549887,
        name: 'Oleksandr Zinchenko',
        position: 'Defender',
        price: '5.5',
        club: 'Manchester City',
        uid: '-M3QcYmfJ18PV806QJCd'
    },
    {
        createdAt: 1585306549889,
        name: 'Joao Cancelo',
        position: 'Defender',
        price: '5.5',
        club: 'Manchester City',
        uid: '-M3QcYmg-w0M2xstjcPo'
    },
    {
        createdAt: 1585306549890,
        name: 'John Stones',
        position: 'Defender',
        price: '5.5',
        club: 'Manchester City',
        uid: '-M3QcYmg-w0M2xstjcPp'
    },
    {
        createdAt: 1585306549891,
        name: 'Aymeric Laporte',
        position: 'Defender',
        price: '6.5',
        club: 'Manchester City',
        uid: '-M3QcYmhx0belq8lK_D6'
    },
    {
        createdAt: 1585306549893,
        name: 'Eric Garcia',
        position: 'Defender',
        price: '4.5',
        club: 'Manchester City',
        uid: '-M3QcYmhx0belq8lK_D7'
    },
    {
        createdAt: 1585306549895,
        name: 'Kevin De Bruyne',
        position: 'Midfielder',
        price: '10.0',
        club: 'Manchester City',
        uid: '-M3QcYmi9h_BdZsT8gDw'
    },
    {
        createdAt: 1585306549896,
        name: 'Raheem Sterling',
        position: 'Midfielder',
        price: '12.0',
        club: 'Manchester City',
        uid: '-M3QcYmi9h_BdZsT8gDx'
    },
    {
        createdAt: 1585306549898,
        name: 'Riyad Mahrez',
        position: 'Midfielder',
        price: '9.0',
        club: 'Manchester City',
        uid: '-M3QcYmj3dUGEPcTpVx8'
    },
    {
        createdAt: 1585306549899,
        name: 'David Silva',
        position: 'Midfielder',
        price: '8.5',
        club: 'Manchester City',
        uid: '-M3QcYmj3dUGEPcTpVx9'
    },
    {
        createdAt: 1585306549900,
        name: 'Bernardo Silva',
        position: 'Midfielder',
        price: '8.0',
        club: 'Manchester City',
        uid: '-M3QcYmk1O1h209YVUXi'
    },
    {
        createdAt: 1585306549902,
        name: 'Fernandinho',
        position: 'Midfielder',
        price: '5.5',
        club: 'Manchester City',
        uid: '-M3QcYmk1O1h209YVUXj'
    },
    {
        createdAt: 1585306549904,
        name: 'Ilkay Gündogan',
        position: 'Midfielder',
        price: '5.5',
        club: 'Manchester City',
        uid: '-M3QcYmk1O1h209YVUXk'
    },
    {
        createdAt: 1585306549905,
        name: 'Phil Foden',
        position: 'Midfielder',
        price: '5.5',
        club: 'Manchester City',
        uid: '-M3QcYml-sgNnBmM3ans'
    },
    {
        createdAt: 1585306549907,
        name: 'Leroy Sané',
        position: 'Midfielder',
        price: '9.5',
        club: 'Manchester City',
        uid: '-M3QcYml-sgNnBmM3ant'
    },
    {
        createdAt: 1585306549909,
        name: 'Sergio Agüero',
        position: 'Forward',
        price: '12.0',
        club: 'Manchester City',
        uid: '-M3QcYmmYqI4qfrAEQjc'
    },
    {
        createdAt: 1585306549911,
        name: 'Gabriel Jesus',
        position: 'Forward',
        price: '10.0',
        club: 'Manchester City',
        uid: '-M3QcYmmYqI4qfrAEQjd'
    },
    {
        createdAt: 1585306549912,
        name: 'David De Gea',
        position: 'Goalkeeper',
        price: '6.0',
        club: 'Manchester United',
        uid: '-M3QcYmnqwpv0D_skuQ7'
    },
    {
        createdAt: 1585306549914,
        name: 'Sergio Romero',
        position: 'Goalkeeper',
        price: '5.0',
        club: 'Manchester United',
        uid: '-M3QcYmnqwpv0D_skuQ8'
    },
    {
        createdAt: 1585306549915,
        name: 'Lee Grant',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Manchester United',
        uid: '-M3QcYmnqwpv0D_skuQ9'
    },
    {
        createdAt: 1585306549917,
        name: 'Harry Maguire',
        position: 'Defender',
        price: '5.5',
        club: 'Manchester United',
        uid: '-M3QcYmo7pPQ2T67iifs'
    },
    {
        createdAt: 1585306549919,
        name: 'Aaron Wan-Bissaka',
        position: 'Defender',
        price: '6.0',
        club: 'Manchester United',
        uid: '-M3QcYmo7pPQ2T67iift'
    },
    {
        createdAt: 1585306549921,
        name: 'Victor Lindelöf',
        position: 'Defender',
        price: '5.5',
        club: 'Manchester United',
        uid: '-M3QcYmpRW2IWwGOuEf7'
    },
    {
        createdAt: 1585306549922,
        name: 'Luke Shaw',
        position: 'Defender',
        price: '5.5',
        club: 'Manchester United',
        uid: '-M3QcYmpRW2IWwGOuEf8'
    },
    {
        createdAt: 1585306549923,
        name: 'Brandon Williams',
        position: 'Defender',
        price: '4.0',
        club: 'Manchester United',
        uid: '-M3QcYmqPnFLELP-XdR3'
    },
    {
        createdAt: 1585306549924,
        name: 'Axel Tuanzebe',
        position: 'Defender',
        price: '4.5',
        club: 'Manchester United',
        uid: '-M3QcYmqPnFLELP-XdR4'
    },
    {
        createdAt: 1585306549926,
        name: 'Eric Baily',
        position: 'Defender',
        price: '5.5',
        club: 'Manchester United',
        uid: '-M3QcYmqPnFLELP-XdR5'
    },
    {
        createdAt: 1585306549927,
        name: 'Diogo Dalot',
        position: 'Defender',
        price: '5.0',
        club: 'Manchester United',
        uid: '-M3QcYmrrnbRT6f2-g74'
    },
    {
        createdAt: 1585306549928,
        name: 'Phil Jones',
        position: 'Defender',
        price: '5.0',
        club: 'Manchester United',
        uid: '-M3QcYmsleq6B_yUGyxh'
    },
    {
        createdAt: 1585306549930,
        name: 'Anthony Martial',
        position: 'Midfielder',
        price: '8.0',
        club: 'Manchester United',
        uid: '-M3QcYmsleq6B_yUGyxi'
    },
    {
        createdAt: 1585306549931,
        name: 'Daniel James',
        position: 'Midfielder',
        price: '6.0',
        club: 'Manchester United',
        uid: '-M3QcYmtjEPDn7h8Bjlg'
    },
    {
        createdAt: 1585306549932,
        name: 'Andreas Pereira',
        position: 'Midfielder',
        price: '5.5',
        club: 'Manchester United',
        uid: '-M3QcYmu4_L84wiC3s1S'
    },
    {
        createdAt: 1585306549934,
        name: 'Scott McTominay',
        position: 'Midfielder',
        price: '5.5',
        club: 'Manchester United',
        uid: '-M3QcYmu4_L84wiC3s1T'
    },
    {
        createdAt: 1585306549936,
        name: 'Fred',
        position: 'Midfielder',
        price: '5.5',
        club: 'Manchester United',
        uid: '-M3QcYmvPcaiwu73GhpA'
    },
    {
        createdAt: 1585306549937,
        name: 'Juan Mata',
        position: 'Midfielder',
        price: '6.5',
        club: 'Manchester United',
        uid: '-M3QcYmvPcaiwu73GhpB'
    },
    {
        createdAt: 1585306549939,
        name: 'Jesse Lingard',
        position: 'Midfielder',
        price: '6.5',
        club: 'Manchester United',
        uid: '-M3QcYmwAfgT7OmuCZnG'
    },
    {
        createdAt: 1585306549941,
        name: 'Nemanja Matic',
        position: 'Midfielder',
        price: '5.0',
        club: 'Manchester United',
        uid: '-M3QcYmxx5To6R7HkLPQ'
    },
    {
        createdAt: 1585306549942,
        name: 'Paul Pogba',
        position: 'Midfielder',
        price: '8.5',
        club: 'Manchester United',
        uid: '-M3QcYmxx5To6R7HkLPR'
    },
    {
        createdAt: 1585306549944,
        name: 'Bruno Fernandes',
        position: 'Midfielder',
        price: '8.0',
        club: 'Manchester United',
        uid: '-M3QcYmza48C9MKwKh_z'
    },
    {
        createdAt: 1585306549945,
        name: 'Tahith Chong',
        position: 'Midfielder',
        price: '4.5',
        club: 'Manchester United',
        uid: '-M3QcYn-kFlD9HBrJxzg'
    },
    {
        createdAt: 1585306549946,
        name: 'Angel Gomes',
        position: 'Midfielder',
        price: '4.5',
        club: 'Manchester United',
        uid: '-M3QcYn0LZMxHD_OddFm'
    },
    {
        createdAt: 1585306549947,
        name: 'James Garner',
        position: 'Midfielder',
        price: '4.5',
        club: 'Manchester United',
        uid: '-M3QcYn0LZMxHD_OddFn'
    },
    {
        createdAt: 1585306549949,
        name: 'Marcus Rashford',
        position: 'Forward',
        price: '9.0',
        club: 'Manchester United',
        uid: '-M3QcYn2vZudNtGM6xHW'
    },
    {
        createdAt: 1585306549950,
        name: 'Mason Greenwood',
        position: 'Forward',
        price: '4.5',
        club: 'Manchester United',
        uid: '-M3QcYn2vZudNtGM6xHX'
    },
    {
        createdAt: 1585306549952,
        name: 'Odion Ighalo',
        position: 'Forward',
        price: '6.5',
        club: 'Manchester United',
        uid: '-M3QcYn3CrKCWfIiE9tg'
    },
    {
        createdAt: 1585306549954,
        name: 'Martin Dubravka',
        position: 'Goalkeeper',
        price: '5.0',
        club: 'Newcastle United',
        uid: '-M3QcYn4f7wxggpQuQTc'
    },
    {
        createdAt: 1585306549955,
        name: 'Karl Darlow',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Newcastle United',
        uid: '-M3QcYn4f7wxggpQuQTd'
    },
    {
        createdAt: 1585306549956,
        name: 'Robert Elliot',
        position: 'Goalkeeper',
        price: '4.0',
        club: 'Newcastle United',
        uid: '-M3QcYn5A07p3r174BOd'
    },
    {
        createdAt: 1585306549957,
        name: 'Federico Fernández',
        position: 'Defender',
        price: '4.5',
        club: 'Newcastle United',
        uid: '-M3QcYn6nyuCOi_MtvuA'
    },
    {
        createdAt: 1585306549959,
        name: 'Jetro Willems',
        position: 'Defender',
        price: '4.5',
        club: 'Newcastle United',
        uid: '-M3QcYn6nyuCOi_MtvuB'
    },
    {
        createdAt: 1585306549960,
        name: 'Fabian Schär',
        position: 'Defender',
        price: '5.0',
        club: 'Newcastle United',
        uid: '-M3QcYn7r-Mu2zeIUEx0'
    },
    {
        createdAt: 1585306549962,
        name: 'Jamaal Lascelles',
        position: 'Defender',
        price: '4.5',
        club: 'Newcastle United',
        uid: '-M3QcYn8sFG2cDVr2DuN'
    },
    {
        createdAt: 1585306549964,
        name: 'Ciaran Clark',
        position: 'Defender',
        price: '4.5',
        club: 'Newcastle United',
        uid: '-M3QcYn8sFG2cDVr2DuO'
    },
    {
        createdAt: 1585306549965,
        name: 'Paul Dummett',
        position: 'Defender',
        price: '4.5',
        club: 'Newcastle United',
        uid: '-M3QcYn9FhZNTcgxBhup'
    },
    {
        createdAt: 1585306549967,
        name: 'Javier Manquillo',
        position: 'Defender',
        price: '4.5',
        club: 'Newcastle United',
        uid: '-M3QcYn9FhZNTcgxBhuq'
    },
    {
        createdAt: 1585306549969,
        name: 'DeAndre Yedlin',
        position: 'Defender',
        price: '4.5',
        club: 'Newcastle United',
        uid: '-M3QcYnAZHu9xFJTyGd4'
    },
    {
        createdAt: 1585306549972,
        name: 'Matt Ritchie',
        position: 'Defender',
        price: '5.5',
        club: 'Newcastle United',
        uid: '-M3QcYnAZHu9xFJTyGd5'
    },
    {
        createdAt: 1585306549973,
        name: 'Emil Krafth',
        position: 'Defender',
        price: '4.5',
        club: 'Newcastle United',
        uid: '-M3QcYnBkxD2X-vyukjW'
    },
    {
        createdAt: 1585306549975,
        name: 'Danny Rose',
        position: 'Defender',
        price: '5.5',
        club: 'Newcastle United',
        uid: '-M3QcYnBkxD2X-vyukjX'
    },
    {
        createdAt: 1585306549976,
        name: 'Miguel Almirón ',
        position: 'Midfielder',
        price: '6.0',
        club: 'Newcastle United',
        uid: '-M3QcYnCI6xeinxSvfwN'
    },
    {
        createdAt: 1585306549978,
        name: 'Jonjo Shelvey',
        position: 'Midfielder',
        price: '5.0',
        club: 'Newcastle United',
        uid: '-M3QcYnCI6xeinxSvfwO'
    },
    {
        createdAt: 1585306549980,
        name: 'Isaac Hayden',
        position: 'Midfielder',
        price: '4.5',
        club: 'Newcastle United',
        uid: '-M3QcYnEMKapLPOzDjJG'
    },
    {
        createdAt: 1585306549981,
        name: 'Allan Saint-Maximin',
        position: 'Midfielder',
        price: '5.5',
        club: 'Newcastle United',
        uid: '-M3QcYnEMKapLPOzDjJH'
    },
    {
        createdAt: 1585306549983,
        name: 'Christian Atsu',
        position: 'Midfielder',
        price: '5.5',
        club: 'Newcastle United',
        uid: '-M3QcYnFp6D56zv6LHZ3'
    },
    {
        createdAt: 1585306549984,
        name: 'Matthew Longstaff',
        position: 'Midfielder',
        price: '5.0',
        club: 'Newcastle United',
        uid: '-M3QcYnGm33EIP0vFjUG'
    },
    {
        createdAt: 1585306549986,
        name: 'Nabil Bentaleb',
        position: 'Midfielder',
        price: '5.0',
        club: 'Newcastle United',
        uid: '-M3QcYnH28Hy26NoyvDd'
    },
    {
        createdAt: 1585306549988,
        name: 'Joelinton',
        position: 'Forward',
        price: '5.5',
        club: 'Newcastle United',
        uid: '-M3QcYnH28Hy26NoyvDe'
    },
    {
        createdAt: 1585306549988,
        name: 'Andy Carroll',
        position: 'Forward',
        price: '5.5',
        club: 'Newcastle United',
        uid: '-M3QcYnI-Jcjj4Diaa8L'
    },
    {
        createdAt: 1585306549990,
        name: 'Dwight Gayle',
        position: 'Forward',
        price: '5.0',
        club: 'Newcastle United',
        uid: '-M3QcYnI-Jcjj4Diaa8M'
    },
    {
        createdAt: 1585306549991,
        name: 'Yoshinori Muto',
        position: 'Forward',
        price: '5.0',
        club: 'Newcastle United',
        uid: '-M3QcYnJyElQ3OPqLbZg'
    },
    {
        createdAt: 1585306549993,
        name: 'Tim Krul',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnJyElQ3OPqLbZh'
    },
    {
        createdAt: 1585306549998,
        name: 'Michael McGovern',
        position: 'Goalkeeper',
        price: '4.0',
        club: 'Norwich City',
        uid: '-M3QcYnLHOK2MpgTSmjr'
    },
    {
        createdAt: 1585306549999,
        name: 'Ralf Fährmann',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnML0oee1__dzPa'
    },
    {
        createdAt: 1585306550001,
        name: 'Max Aarons',
        position: 'Defender',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnML0oee1__dzPb'
    },
    {
        createdAt: 1585306550004,
        name: 'Christoph Zimmermann',
        position: 'Defender',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnNeK3thLuK2QLG'
    },
    {
        createdAt: 1585306550005,
        name: 'Sam Byram',
        position: 'Defender',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnNeK3thLuK2QLH'
    },
    {
        createdAt: 1585306550006,
        name: 'Ben Godfrey',
        position: 'Defender',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnOF54yD9JWCWwR'
    },
    {
        createdAt: 1585306550008,
        name: 'Jamal Lewis',
        position: 'Defender',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnPW_YcIYacevEq'
    },
    {
        createdAt: 1585306550009,
        name: 'Grant Hanley',
        position: 'Defender',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnPW_YcIYacevEr'
    },
    {
        createdAt: 1585306550015,
        name: 'Timm Klose',
        position: 'Defender',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnQFkiYnLRwIdOf'
    },
    {
        createdAt: 1585306550017,
        name: 'Todd Cantwell',
        position: 'Midfielder',
        price: '5.0',
        club: 'Norwich City',
        uid: '-M3QcYnQFkiYnLRwIdOg'
    },
    {
        createdAt: 1585306550019,
        name: 'Emiliano Buendia',
        position: 'Midfielder',
        price: '6.0',
        club: 'Norwich City',
        uid: '-M3QcYnRD_iOZGO-a-bS'
    },
    {
        createdAt: 1585306550023,
        name: 'Kenny McLean',
        position: 'Midfielder',
        price: '5.0',
        club: 'Norwich City',
        uid: '-M3QcYnRD_iOZGO-a-bT'
    },
    {
        createdAt: 1585306550025,
        name: 'Alexander Tettey',
        position: 'Midfielder',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnSni_zCKNKc2Vh'
    },
    {
        createdAt: 1585306550027,
        name: 'Onel Hernández',
        position: 'Midfielder',
        price: '5.5',
        club: 'Norwich City',
        uid: '-M3QcYnSni_zCKNKc2Vi'
    },
    {
        createdAt: 1585306550028,
        name: 'Tom Trybull',
        position: 'Midfielder',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnT5ZulgAkxflFh'
    },
    {
        createdAt: 1585306550030,
        name: 'Marco Stiepermann',
        position: 'Midfielder',
        price: '5.0',
        club: 'Norwich City',
        uid: '-M3QcYnUmFy0pDPX-PJ2'
    },
    {
        createdAt: 1585306550031,
        name: 'Mario Vrancic',
        position: 'Midfielder',
        price: '6.0',
        club: 'Norwich City',
        uid: '-M3QcYnVsOAZWJg4ILIt'
    },
    {
        createdAt: 1585306550033,
        name: 'Ondrej Duda',
        position: 'Midfielder',
        price: '5.0',
        club: 'Norwich City',
        uid: '-M3QcYnXbpGroK-5lLXG'
    },
    {
        createdAt: 1585306550034,
        name: 'Lukas Rupp',
        position: 'Midfielder',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnY0-pTXX_-ZzyH'
    },
    {
        createdAt: 1585306550036,
        name: 'Moritz Leitner',
        position: 'Midfielder',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnZPKQYCf_KGxU-'
    },
    {
        createdAt: 1585306550036,
        name: 'Teemu Pukki',
        position: 'Forward',
        price: '6.5',
        club: 'Norwich City',
        uid: '-M3QcYn_LvJvY15OURZ6'
    },
    {
        createdAt: 1585306550038,
        name: 'Josip Drmic',
        position: 'Forward',
        price: '5.5',
        club: 'Norwich City',
        uid: '-M3QcYn_LvJvY15OURZ7'
    },
    {
        createdAt: 1585306550039,
        name: 'Adam Idah',
        position: 'Forward',
        price: '4.5',
        club: 'Norwich City',
        uid: '-M3QcYnat6xXSjHCbwNF'
    },
    {
        createdAt: 1585306550041,
        name: 'Dean Henderson',
        position: 'Goalkeeper',
        price: '5.0',
        club: 'Sheffield United',
        uid: '-M3QcYnbv7S5F99Ld9_M'
    },
    {
        createdAt: 1585306550041,
        name: 'Jake Eastwood',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Sheffield United',
        uid: '-M3QcYncpN63KFTSIT-5'
    },
    {
        createdAt: 1585306550042,
        name: 'Simon Moore',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Sheffield United',
        uid: '-M3QcYncpN63KFTSIT-6'
    },
    {
        createdAt: 1585306550044,
        name: 'John Lundstram',
        position: 'Defender',
        price: '5.0',
        club: 'Sheffield United',
        uid: '-M3QcYndXXBREQvKYM2q'
    },
    {
        createdAt: 1585306550046,
        name: 'George Baldock',
        position: 'Defender',
        price: '5.0',
        club: 'Sheffield United',
        uid: '-M3QcYneF-M-a7Ws98-f'
    },
    {
        createdAt: 1585306550047,
        name: 'Enda Stevens',
        position: 'Defender',
        price: '5.0',
        club: 'Sheffield United',
        uid: '-M3QcYneF-M-a7Ws98-g'
    },
    {
        createdAt: 1585306550048,
        name: "Jack O'Connell",
        position: 'Defender',
        price: '4.5',
        club: 'Sheffield United',
        uid: '-M3QcYnffZ__vABVUuOn'
    },
    {
        createdAt: 1585306550049,
        name: 'John Egan',
        position: 'Defender',
        price: '4.5',
        club: 'Sheffield United',
        uid: '-M3QcYnffZ__vABVUuOo'
    },
    {
        createdAt: 1585306550051,
        name: 'Chris Basham',
        position: 'Defender',
        price: '4.5',
        club: 'Sheffield United',
        uid: '-M3QcYng7K6k3U68h5Az'
    },
    {
        createdAt: 1585306550052,
        name: 'Kieron Freeman',
        position: 'Defender',
        price: '4.0',
        club: 'Sheffield United',
        uid: '-M3QcYng7K6k3U68h5B-'
    },
    {
        createdAt: 1585306550053,
        name: 'John Fleck',
        position: 'Midfielder',
        price: '5.0',
        club: 'Sheffield United',
        uid: '-M3QcYnhK9UYMJnqHTGL'
    },
    {
        createdAt: 1585306550054,
        name: 'Oliver Norwood',
        position: 'Midfielder',
        price: '5.0',
        club: 'Sheffield United',
        uid: '-M3QcYnhK9UYMJnqHTGM'
    },
    {
        createdAt: 1585306550056,
        name: 'Luke Freeman',
        position: 'Midfielder',
        price: '5.0',
        club: 'Sheffield United',
        uid: '-M3QcYniQ4KaeTykwOh7'
    },
    {
        createdAt: 1585306550057,
        name: 'Muhamed Besic',
        position: 'Midfielder',
        price: '4.5',
        club: 'Sheffield United',
        uid: '-M3QcYniQ4KaeTykwOh8'
    },
    {
        createdAt: 1585306550059,
        name: 'Ben Osborn',
        position: 'Midfielder',
        price: '4.5',
        club: 'Sheffield United',
        uid: '-M3QcYnjlt1lJpPQTRIg'
    },
    {
        createdAt: 1585306550061,
        name: 'Sander Berge',
        position: 'Midfielder',
        price: '5.0',
        club: 'Sheffield United',
        uid: '-M3QcYnjlt1lJpPQTRIh'
    },
    {
        createdAt: 1585306550061,
        name: 'Lys Mousset',
        position: 'Forward',
        price: '4.5',
        club: 'Sheffield United',
        uid: '-M3QcYnkMYVwnAYVtH3S'
    },
    {
        createdAt: 1585306550063,
        name: 'Oliver McBurnie',
        position: 'Forward',
        price: '5.5',
        club: 'Sheffield United',
        uid: '-M3QcYnkMYVwnAYVtH3T'
    },
    {
        createdAt: 1585306550065,
        name: 'David McGoldrick',
        position: 'Forward',
        price: '5.5',
        club: 'Sheffield United',
        uid: '-M3QcYnkMYVwnAYVtH3U'
    },
    {
        createdAt: 1585306550067,
        name: 'Billy Sharp',
        position: 'Forward',
        price: '5.5',
        club: 'Sheffield United',
        uid: '-M3QcYnlIw1tCgMF4vJT'
    },
    {
        createdAt: 1585306550068,
        name: 'Alex McCarthy',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Southampton',
        uid: '-M3QcYnlIw1tCgMF4vJU'
    },
    {
        createdAt: 1585306550069,
        name: 'Angus Gunn',
        position: 'Goalkeeper',
        price: '4.0',
        club: 'Southampton',
        uid: '-M3QcYnnmk8v2sIgfEFJ'
    },
    {
        createdAt: 1585306550070,
        name: 'Harry Lewis',
        position: 'Goalkeeper',
        price: '4.0',
        club: 'Southampton',
        uid: '-M3QcYno_CqFr2_PAaP-'
    },
    {
        createdAt: 1585306550075,
        name: 'Jack Stephens',
        position: 'Defender',
        price: '4.5',
        club: 'Southampton',
        uid: '-M3QcYno_CqFr2_PAaP0'
    },
    {
        createdAt: 1585306550076,
        name: 'Jan Bednarek',
        position: 'Defender',
        price: '4.5',
        club: 'Southampton',
        uid: '-M3QcYnpMJaIRG0GaDYG'
    },
    {
        createdAt: 1585306550078,
        name: 'Ryan Bertrand',
        position: 'Defender',
        price: '5.0',
        club: 'Southampton',
        uid: '-M3QcYnpMJaIRG0GaDYH'
    },
    {
        createdAt: 1585306550080,
        name: 'Jannik Vestergaard',
        position: 'Defender',
        price: '4.5',
        club: 'Southampton',
        uid: '-M3QcYnpMJaIRG0GaDYI'
    },
    {
        createdAt: 1585306550081,
        name: 'Yan Valery',
        position: 'Defender',
        price: '4.5',
        club: 'Southampton',
        uid: '-M3QcYnq29w3qi35x3mi'
    },
    {
        createdAt: 1585306550083,
        name: 'Kevin Danso',
        position: 'Defender',
        price: '4.5',
        club: 'Southampton',
        uid: '-M3QcYnrlH-y4a52323k'
    },
    {
        createdAt: 1585306550084,
        name: 'James Ward-Prowse',
        position: 'Midfielder',
        price: '6.0',
        club: 'Southampton',
        uid: '-M3QcYnrlH-y4a52323l'
    },
    {
        createdAt: 1585306550085,
        name: 'Nathan Redmond',
        position: 'Midfielder',
        price: '6.0',
        club: 'Southampton',
        uid: '-M3QcYnrlH-y4a52323m'
    },
    {
        createdAt: 1585306550086,
        name: 'Pierre-Emile Hojbjerg',
        position: 'Midfielder',
        price: '5.0',
        club: 'Southampton',
        uid: '-M3QcYnsF26Um1oYKLm7'
    },
    {
        createdAt: 1585306550088,
        name: 'Stuart Armstrong',
        position: 'Midfielder',
        price: '5.5',
        club: 'Southampton',
        uid: '-M3QcYnsF26Um1oYKLm8'
    },
    {
        createdAt: 1585306550088,
        name: 'Moussa Djenepo',
        position: 'Midfielder',
        price: '5.5',
        club: 'Southampton',
        uid: '-M3QcYnttyIAuVE1_1rA'
    },
    {
        createdAt: 1585306550090,
        name: 'Oriol Romeu',
        position: 'Midfielder',
        price: '4.5',
        club: 'Southampton',
        uid: '-M3QcYnvbaxOl6QplC1n'
    },
    {
        createdAt: 1585306550443,
        name: 'Sofiane Boufal',
        position: 'Midfielder',
        price: '5.5',
        club: 'Southampton',
        uid: '-M3QcYnvbaxOl6QplC1o'
    },
    {
        createdAt: 1585306550445,
        name: 'Danny Ings',
        position: 'Forward',
        price: '6.5',
        club: 'Southampton',
        uid: '-M3QcYnvbaxOl6QplC1p'
    },
    {
        createdAt: 1585306550447,
        name: 'Shane Long',
        position: 'Forward',
        price: '4.5',
        club: 'Southampton',
        uid: '-M3QcYnwBx8SoYNsPEr8'
    },
    {
        createdAt: 1585306550449,
        name: 'Che Adams',
        position: 'Forward',
        price: '5.5',
        club: 'Southampton',
        uid: '-M3QcYnwBx8SoYNsPEr9'
    },
    {
        createdAt: 1585306550451,
        name: 'Michael Obafemi',
        position: 'Forward',
        price: '5.0',
        club: 'Southampton',
        uid: '-M3QcYnx2PDz504lEfIE'
    },
    {
        createdAt: 1585306550452,
        name: 'Hugo Lloris',
        position: 'Goalkeeper',
        price: '5.5',
        club: 'Tottenham',
        uid: '-M3QcYnx2PDz504lEfIF'
    },
    {
        createdAt: 1585306550454,
        name: 'Paulo Gazzaniga',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Tottenham',
        uid: '-M3QcYnyEgkUWb_Nr3Yy'
    },
    {
        createdAt: 1585306550456,
        name: 'Serge Aurier',
        position: 'Defender',
        price: '5.0',
        club: 'Tottenham',
        uid: '-M3QcYnzLN8ArgkaNvtP'
    },
    {
        createdAt: 1585306550457,
        name: 'Toby Alderweireld',
        position: 'Defender',
        price: '5.5',
        club: 'Tottenham',
        uid: '-M3QcYnzLN8ArgkaNvtQ'
    },
    {
        createdAt: 1585306550458,
        name: 'Jan Vertonghen',
        position: 'Defender',
        price: '5.5',
        club: 'Tottenham',
        uid: '-M3QcYo-yy0mbgmRRVxC'
    },
    {
        createdAt: 1585306550459,
        name: 'Davinson Sánchez',
        position: 'Defender',
        price: '5.5',
        club: 'Tottenham',
        uid: '-M3QcYo-yy0mbgmRRVxD'
    },
    {
        createdAt: 1585306550460,
        name: 'Japhet Tanganga',
        position: 'Defender',
        price: '4.0',
        club: 'Tottenham',
        uid: '-M3QcYo0v_xKZ_a5FOCa'
    },
    {
        createdAt: 1585306550461,
        name: 'Ben Davies',
        position: 'Defender',
        price: '5.5',
        club: 'Tottenham',
        uid: '-M3QcYo0v_xKZ_a5FOCb'
    },
    {
        createdAt: 1585306550463,
        name: 'Juan Foyth',
        position: 'Defender',
        price: '5.0',
        club: 'Tottenham',
        uid: '-M3QcYo17Ebc0nytT9bv'
    },
    {
        createdAt: 1585306550464,
        name: 'Heung-Min Son',
        position: 'Midfielder',
        price: '9.5',
        club: 'Tottenham',
        uid: '-M3QcYo17Ebc0nytT9bw'
    },
    {
        createdAt: 1585306550466,
        name: 'Dele Alli',
        position: 'Midfielder',
        price: '8.5',
        club: 'Tottenham',
        uid: '-M3QcYo17Ebc0nytT9bx'
    },
    {
        createdAt: 1585306550467,
        name: 'Lucas Moura',
        position: 'Midfielder',
        price: '7.0',
        club: 'Tottenham',
        uid: '-M3QcYo2YapHCqDNaC8p'
    },
    {
        createdAt: 1585306550468,
        name: 'Moussa Sissoko',
        position: 'Midfielder',
        price: '5.0',
        club: 'Tottenham',
        uid: '-M3QcYo2YapHCqDNaC8q'
    },
    {
        createdAt: 1585306550469,
        name: 'Erik Lamela',
        position: 'Midfielder',
        price: '6.0',
        club: 'Tottenham',
        uid: '-M3QcYo3E--i4tiOg93J'
    },
    {
        createdAt: 1585306550470,
        name: 'Tanguy Ndombele',
        position: 'Midfielder',
        price: '6.0',
        club: 'Tottenham',
        uid: '-M3QcYo3E--i4tiOg93K'
    },
    {
        createdAt: 1585306550473,
        name: 'Harry Winks',
        position: 'Midfielder',
        price: '5.5',
        club: 'Tottenham',
        uid: '-M3QcYo3E--i4tiOg93L'
    },
    {
        createdAt: 1585306550475,
        name: 'Giovani Lo Celso',
        position: 'Midfielder',
        price: '7.5',
        club: 'Tottenham',
        uid: '-M3QcYo4lTvtZBQTkevq'
    },
    {
        createdAt: 1585306550477,
        name: 'Eric Dier',
        position: 'Midfielder',
        price: '5.0',
        club: 'Tottenham',
        uid: '-M3QcYo5bjpOkCftiI9i'
    },
    {
        createdAt: 1585306550478,
        name: 'Steven Bergwijn',
        position: 'Midfielder',
        price: '7.5',
        club: 'Tottenham',
        uid: '-M3QcYo5bjpOkCftiI9j'
    },
    {
        createdAt: 1585306550479,
        name: 'Ryan Sessegnon',
        position: 'Midfielder',
        price: '5.5',
        club: 'Tottenham',
        uid: '-M3QcYo5bjpOkCftiI9k'
    },
    {
        createdAt: 1585306550480,
        name: 'Harry Kane',
        position: 'Forward',
        price: '11.0',
        club: 'Tottenham',
        uid: '-M3QcYo6qsu-Wnp_KdFR'
    },
    {
        createdAt: 1585306550482,
        name: 'Troy Parrott',
        position: 'Forward',
        price: '4.5',
        club: 'Tottenham',
        uid: '-M3QcYo6qsu-Wnp_KdFS'
    },
    {
        createdAt: 1585306550483,
        name: 'Ben Foster',
        position: 'Goalkeeper',
        price: '5.0',
        club: 'Watford',
        uid: '-M3QcYo7fIemzOCVxXbz'
    },
    {
        createdAt: 1585306550484,
        name: 'Heurelho Gomes',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Watford',
        uid: '-M3QcYo7fIemzOCVxXc-'
    },
    {
        createdAt: 1585306550486,
        name: 'Craig Cathcart',
        position: 'Defender',
        price: '4.5',
        club: 'Watford',
        uid: '-M3QcYo7fIemzOCVxXc0'
    },
    {
        createdAt: 1585306550488,
        name: 'Christian Kabasele',
        position: 'Defender',
        price: '4.5',
        club: 'Watford',
        uid: '-M3QcYo8dSnzEBL5EGLC'
    },
    {
        createdAt: 1585306550490,
        name: 'Adam Masina',
        position: 'Defender',
        price: '4.5',
        club: 'Watford',
        uid: '-M3QcYo8dSnzEBL5EGLD'
    },
    {
        createdAt: 1585306550490,
        name: 'Daryl Janmaat',
        position: 'Defender',
        price: '4.0',
        club: 'Watford',
        uid: '-M3QcYo968SGxJk4IUx6'
    },
    {
        createdAt: 1585306550492,
        name: 'Craig Dawson',
        position: 'Defender',
        price: '5.0',
        club: 'Watford',
        uid: '-M3QcYo968SGxJk4IUx7'
    },
    {
        createdAt: 1585306550493,
        name: 'Kiko Fermenia',
        position: 'Defender',
        price: '4.5',
        club: 'Watford',
        uid: '-M3QcYoAnUcYGlc7q_gy'
    },
    {
        createdAt: 1585306550495,
        name: 'Adrian Mariappa',
        position: 'Defender',
        price: '4.5',
        club: 'Watford',
        uid: '-M3QcYoAnUcYGlc7q_gz'
    },
    {
        createdAt: 1585306550496,
        name: 'José Holebas',
        position: 'Defender',
        price: '4.5',
        club: 'Watford',
        uid: '-M3QcYoAnUcYGlc7q_h-'
    },
    {
        createdAt: 1585306550497,
        name: 'Abdoulaye Doucouré',
        position: 'Midfielder',
        price: '6.0',
        club: 'Watford',
        uid: '-M3QcYoBNt-TjsMHD-5y'
    },
    {
        createdAt: 1585306550499,
        name: 'Etienne Capoue',
        position: 'Midfielder',
        price: '5.0',
        club: 'Watford',
        uid: '-M3QcYoBNt-TjsMHD-5z'
    },
    {
        createdAt: 1585306550500,
        name: 'Ismaila Sarr',
        position: 'Midfielder',
        price: '6.5',
        club: 'Watford',
        uid: '-M3QcYoCUqzcvMm01_af'
    },
    {
        createdAt: 1585306550501,
        name: 'Roberto Pereyra',
        position: 'Midfielder',
        price: '5.5',
        club: 'Watford',
        uid: '-M3QcYoCUqzcvMm01_ag'
    },
    {
        createdAt: 1585306550502,
        name: 'Will Hughes',
        position: 'Midfielder',
        price: '5.5',
        club: 'Watford',
        uid: '-M3QcYoEcXrBZwaPQscp'
    },
    {
        createdAt: 1585306550504,
        name: 'Nathaniel Chalobah',
        position: 'Midfielder',
        price: '4.5',
        club: 'Watford',
        uid: '-M3QcYoFWCCCmKmPbYKL'
    },
    {
        createdAt: 1585306550506,
        name: 'Tom Cleverley',
        position: 'Midfielder',
        price: '5.0',
        club: 'Watford',
        uid: '-M3QcYoFWCCCmKmPbYKM'
    },
    {
        createdAt: 1585306550507,
        name: 'Domingos Quina',
        position: 'Midfielder',
        price: '4.5',
        club: 'Watford',
        uid: '-M3QcYoGxmS8s6Xy1UUs'
    },
    {
        createdAt: 1585306550508,
        name: 'Gerard Deulofeu',
        position: 'Forward',
        price: '6.5',
        club: 'Watford',
        uid: '-M3QcYoGxmS8s6Xy1UUt'
    },
    {
        createdAt: 1585306550509,
        name: 'Troy Deeney',
        position: 'Forward',
        price: '6.5',
        club: 'Watford',
        uid: '-M3QcYoHPUfb_GUHpvAD'
    },
    {
        createdAt: 1585306550511,
        name: 'Andre Gray',
        position: 'Forward',
        price: '5.5',
        club: 'Watford',
        uid: '-M3QcYoIsnCoPX-4Q_Gw'
    },
    {
        createdAt: 1585306550512,
        name: 'Danny Welbeck',
        position: 'Forward',
        price: '6.0',
        club: 'Watford',
        uid: '-M3QcYoJzHfdTY-nb3bQ'
    },
    {
        createdAt: 1585306550513,
        name: 'Isaac Success',
        position: 'Forward',
        price: '4.5',
        club: 'Watford',
        uid: '-M3QcYoJzHfdTY-nb3bR'
    },
    {
        createdAt: 1585306550514,
        name: 'Lukasz Fabianski',
        position: 'Goalkeeper',
        price: '5.0',
        club: 'West Ham',
        uid: '-M3QcYoKFDIiiGBHl5cx'
    },
    {
        createdAt: 1585306550515,
        name: 'David Martin',
        position: 'Goalkeeper',
        price: '4.0',
        club: 'West Ham',
        uid: '-M3QcYoKFDIiiGBHl5cy'
    },
    {
        createdAt: 1585306550516,
        name: 'Darren Randolph',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'West Ham',
        uid: '-M3QcYoL0AH4eBxlFcdf'
    },
    {
        createdAt: 1585306550518,
        name: 'Angelo Ogbonna',
        position: 'Defender',
        price: '4.5',
        club: 'West Ham',
        uid: '-M3QcYoMnWzdygGKa36x'
    },
    {
        createdAt: 1585306550519,
        name: 'Aaron Cresswell',
        position: 'Defender',
        price: '4.5',
        club: 'West Ham',
        uid: '-M3QcYoMnWzdygGKa36y'
    },
    {
        createdAt: 1585306550520,
        name: 'Ryan Fredericks',
        position: 'Defender',
        price: '4.5',
        club: 'West Ham',
        uid: '-M3QcYoNlEwzqy5X9rTv'
    },
    {
        createdAt: 1585306550522,
        name: 'Issa Diop',
        position: 'Defender',
        price: '4.5',
        club: 'West Ham',
        uid: '-M3QcYoNlEwzqy5X9rTw'
    },
    {
        createdAt: 1585306550523,
        name: 'Fabián Balbuena',
        position: 'Defender',
        price: '4.5',
        club: 'West Ham',
        uid: '-M3QcYoOXLy5HJFeEnl8'
    },
    {
        createdAt: 1585306550524,
        name: 'Arthur Masuaku',
        position: 'Defender',
        price: '4.5',
        club: 'West Ham',
        uid: '-M3QcYoOXLy5HJFeEnl9'
    },
    {
        createdAt: 1585306550526,
        name: 'Pablo Zabaleta',
        position: 'Defender',
        price: '4.5',
        club: 'West Ham',
        uid: '-M3QcYoPQIx_6X7JaMtx'
    },
    {
        createdAt: 1585306550527,
        name: 'Robert Snodgrass',
        position: 'Midfielder',
        price: '5.5',
        club: 'West Ham',
        uid: '-M3QcYoPQIx_6X7JaMty'
    },
    {
        createdAt: 1585306550528,
        name: 'Mark Noble',
        position: 'Midfielder',
        price: '5.0',
        club: 'West Ham',
        uid: '-M3QcYoQJSXMvG8eauqr'
    },
    {
        createdAt: 1585306550530,
        name: 'Declan Rice',
        position: 'Midfielder',
        price: '5.0',
        club: 'West Ham',
        uid: '-M3QcYoQJSXMvG8eauqs'
    },
    {
        createdAt: 1585306550532,
        name: 'Felipe Anderson',
        position: 'Midfielder',
        price: '7.0',
        club: 'West Ham',
        uid: '-M3QcYoR0QP7c8R5miiS'
    },
    {
        createdAt: 1585306550533,
        editedAt: 1585306604772,
        name: 'Pablo Fornals',
        position: 'Midfielder',
        price: '6.2',
        club: 'West Ham',
        uid: '-M3QcYoR0QP7c8R5miiT'
    },
    {
        createdAt: 1585306550535,
        name: 'Andriy Yarmolennko',
        position: 'Midfielder',
        price: '5.5',
        club: 'West Ham',
        uid: '-M3QcYoR0QP7c8R5miiU'
    },
    {
        createdAt: 1585306550536,
        name: 'Manuel Lanzini',
        position: 'Midfielder',
        price: '6.5',
        club: 'West Ham',
        uid: '-M3QcYoSNl1nVQTE5466'
    },
    {
        createdAt: 1585306550538,
        name: 'Michail Antonio',
        position: 'Midfielder',
        price: '7.0',
        club: 'West Ham',
        uid: '-M3QcYoSNl1nVQTE5467'
    },
    {
        createdAt: 1585306550539,
        name: 'Carlos Sánchez',
        position: 'Midfielder',
        price: '4.5',
        club: 'West Ham',
        uid: '-M3QcYoTJIeyLW2IKlIq'
    },
    {
        createdAt: 1585306550541,
        name: 'Sébastien Haller',
        position: 'Forward',
        price: '7.0',
        club: 'West Ham',
        uid: '-M3QcYoTJIeyLW2IKlIr'
    },
    {
        createdAt: 1585306550542,
        name: 'Albian Ajeti',
        position: 'Forward',
        price: '6.0',
        club: 'West Ham',
        uid: '-M3QcYoUO5e3v9L1bsHs'
    },
    {
        createdAt: 1585306550544,
        name: 'Rui Patrício',
        position: 'Goalkeeper',
        price: '5.0',
        club: 'Wolverhampton',
        uid: '-M3QcYoUO5e3v9L1bsHt'
    },
    {
        createdAt: 1585306550545,
        name: 'John Ruddy',
        position: 'Goalkeeper',
        price: '4.5',
        club: 'Wolverhampton',
        uid: '-M3QcYoUO5e3v9L1bsHu'
    },
    {
        createdAt: 1585306550547,
        name: 'Matt Doherty',
        position: 'Defender',
        price: '6.0',
        club: 'Wolverhampton',
        uid: '-M3QcYoVQOEwjqLRSv6F'
    },
    {
        createdAt: 1585306550548,
        name: 'Conor Coady',
        position: 'Defender',
        price: '5.0',
        club: 'Wolverhampton',
        uid: '-M3QcYoVQOEwjqLRSv6G'
    },
    {
        createdAt: 1585306550549,
        editedAt: 1585306577411,
        name: 'Jonny',
        position: 'Defender',
        price: '6.5',
        club: 'Wolverhampton',
        uid: '-M3QcYoWOlCBCzpEkwN7'
    },
    {
        createdAt: 1585306550551,
        name: 'Romain Saiss',
        position: 'Defender',
        price: '4.5',
        club: 'Wolverhampton',
        uid: '-M3QcYoWOlCBCzpEkwN8'
    },
    {
        createdAt: 1585306550553,
        name: 'Willy Boly',
        position: 'Defender',
        price: '5.0',
        club: 'Wolverhampton',
        uid: '-M3QcYoXTwbUtp4Rybub'
    },
    {
        createdAt: 1585306550555,
        name: 'Rúben Vinagre',
        position: 'Defender',
        price: '4.5',
        club: 'Wolverhampton',
        uid: '-M3QcYoXTwbUtp4Rybuc'
    },
    {
        createdAt: 1585306550556,
        name: 'Maximilian Kilman',
        position: 'Defender',
        price: '4.0',
        club: 'Wolverhampton',
        uid: '-M3QcYoYI-5yZq9m48w-'
    },
    {
        createdAt: 1585306550558,
        name: 'Adama Traoré',
        position: 'Midfielder',
        price: '6.0',
        club: 'Wolverhampton',
        uid: '-M3QcYo_nwP-n2nBvNIN'
    },
    {
        createdAt: 1585306550559,
        name: 'Joao Moutinho',
        position: 'Midfielder',
        price: '5.5',
        club: 'Wolverhampton',
        uid: '-M3QcYo_nwP-n2nBvNIO'
    },
    {
        createdAt: 1585306550561,
        name: 'Leander Dendocker',
        position: 'Midfielder',
        price: '4.5',
        club: 'Wolverhampton',
        uid: '-M3QcYobggvjMmoE5QNe'
    },
    {
        createdAt: 1585306550562,
        name: 'Rúben Neves',
        position: 'Midfielder',
        price: '5.5',
        club: 'Wolverhampton',
        uid: '-M3QcYobggvjMmoE5QNf'
    },
    {
        createdAt: 1585306550563,
        name: 'Pedro Neto',
        position: 'Midfielder',
        price: '5.0',
        club: 'Wolverhampton',
        uid: '-M3QcYocIY7s43ximwte'
    },
    {
        createdAt: 1585306550565,
        name: 'Morgan Gibbs-White',
        position: 'Midfielder',
        price: '5.0',
        club: 'Wolverhampton',
        uid: '-M3QcYocIY7s43ximwtf'
    },
    {
        createdAt: 1585306550566,
        name: 'Daniel Podence',
        position: 'Midfielder',
        price: '5.5',
        club: 'Wolverhampton',
        uid: '-M3QcYodAhA_jAysSg_6'
    },
    {
        createdAt: 1585306550568,
        name: 'Raúl Jimenez',
        position: 'Forward',
        price: '7.5',
        club: 'Wolverhampton',
        uid: '-M3QcYodAhA_jAysSg_7'
    },
    {
        createdAt: 1585306550570,
        name: 'Diogo Jota',
        position: 'Forward',
        price: '6.0',
        club: 'Wolverhampton',
        uid: '-M3QcYoeZEoOkQBoF56B'
    }
];

const arrOfFractions = arr => {
    let arPercentages = [];

    for (var i = 0; i < arr.length; i++) {
        arPercentages.push(Math.random() * 10000 + 100);
    }
    let total = arPercentages.reduce((acc, cur) => {
        return acc + cur;
    }, 0);

    for (let i = 0; i < arr.length; i++) {
        arPercentages[i] = Math.round((arPercentages[i] / total) * 100 * 100) / 100;
    }
    return arPercentages;
};

const appendToObj = (obj, arr) => {
    obj.map((o, i) => (o.popularity = arr[i]));
};

appendToObj(players, arrOfFractions(players));

/* export default players; */

const getPlayers = async callback => {
    await apis
        .get('getPlayers')
        .then(async res => {
            // if no, create new user
            if (!res.data || res.data === '') {
                return console.log('no player-data was returned.');
            }

            // if yes, load user
            const players = res.data.data;

            if (typeof callback === 'function') return callback(players);
        })
        .catch(err => {
            // if db unavailable, load from client
            console.log('Getting players failed.');
        });
};

export default getPlayers;
