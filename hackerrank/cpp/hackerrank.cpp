#include <iostream>
#include <fstream>
#include <vector>
#include <stack>
#include <string>
#include <ctype.h>

using namespace std;

int main()
{
    //ofstream fout(getenv("OUTPUT_PATH"));
    
    ifstream idatafile("input.txt");
    if (idatafile.is_open())
    {
        string line;
        int q;
        getline(idatafile, line);
        q = stoi(line);

        //cin.ignore(numeric_limits<streamsize>::max(), '\n');

        for (int q_itr = 0; q_itr < q; q_itr++) {
            string a;
            getline(idatafile, a);

            string result = "";
            
            // call some function();

            std::cout << result << "\n";
        }
        idatafile.close();
    }

    //fout.close();

    return 0;
}
