#include <iostream>
#include <fstream>
#include <vector>
#include <stack>
#include <string>
#include <ctype.h>

using namespace std;

int main()
{
    const int PRECISION_FACTOR = 10000;
    string sPreciseDecimal = "";
    int pause;
    double nSeedBet( 0 );
    double nSeedBet2( 0 );
    double nSeedBetPct( 0 );
    auto const bet = 20 * 50;
    
    int nSeedBetInt( 0 );
    int nSeedBetPctInt( 0 );
    
    nSeedBet = 15620 / 1000000.0;
    nSeedBet2 = nSeedBet * 10000.0;
    nSeedBetPct = nSeedBet2 / bet;

    nSeedBetInt = 15620 * PRECISION_FACTOR;
    nSeedBetPctInt = nSeedBetInt / bet;
    sPreciseDecimal = std::to_string(nSeedBetPctInt / (PRECISION_FACTOR * 10000)) + "." + std::to_string(nSeedBetPctInt % (PRECISION_FACTOR*10000));

    std::cout << "Hello World:" << nSeedBetPct << "\n";
    std::cin >> pause;
    return 0;
}
